import React, { useState, useEffect, useRef, useCallback } from "react";
import "./carousel.css";
import { FaChevronLeft, FaChevronRight, FaDownload, FaExpand, FaCompress } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageDataUrl, setPageDataUrl] = useState(null);
  const [scale, setScale] = useState(1.5);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Cache for rendered blob URLs
  const pageCache = useRef(new Map());
  const renderingRef = useRef(new Set()); // Track pages currently being rendered
  const containerRef = useRef(null);
  
  // Cleanup cache on unmount
  useEffect(() => {
    return () => {
      pageCache.current.forEach((url) => URL.revokeObjectURL(url));
      pageCache.current.clear();
    };
  }, []);

  // Track fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const PDF_PATH = "/pdfs/carousel.pdf";

  // Load PDF document
  useEffect(() => {
    const loadPdfDoc = async () => {
      try {
        setLoading(true);
        const pdfjsLib = await import("pdfjs-dist");
        
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument(PDF_PATH);
        const loadedPdf = await loadingTask.promise;
        
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Could not load brochure. Check if carousel.pdf exists in /public/pdfs/");
        setLoading(false);
      }
    };

    loadPdfDoc();
  }, []);

  // The core rendering function that populates the cache
  const renderPageToCache = useCallback(async (pageNum, force = false) => {
    if (!pdf || pageNum < 1 || pageNum > numPages) return;
    
    // Skip if already in cache or currently rendering (unless forced)
    if (!force && pageCache.current.has(pageNum)) return pageCache.current.get(pageNum);
    if (renderingRef.current.has(pageNum)) return null;

    renderingRef.current.add(pageNum);

    try {
      const page = await pdf.getPage(pageNum);
      // Use 2.0x for crisp pages while keeping it snappy
      const viewport = page.getViewport({ scale: isFullscreen ? 2.5 : 2.0 });
      
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            renderingRef.current.delete(pageNum);
            resolve(null);
            return;
          }
          
          const url = URL.createObjectURL(blob);
          
          // If we had an old one for this page, clean it
          if (pageCache.current.has(pageNum)) {
            URL.revokeObjectURL(pageCache.current.get(pageNum));
          }
          
          pageCache.current.set(pageNum, url);
          renderingRef.current.delete(pageNum);
          resolve(url);
        }, "image/png");
      });
    } catch (err) {
      console.error("Render error for page", pageNum, err);
      renderingRef.current.delete(pageNum);
      return null;
    }
  }, [pdf, numPages, isFullscreen]);

  // Main page display effect
  useEffect(() => {
    const showPage = async () => {
      if (!pdf) return;
      
      // 1. Check if already in cache
      if (pageCache.current.has(currentPage)) {
        setPageDataUrl(pageCache.current.get(currentPage));
      } else {
        // 2. Render and show
        const url = await renderPageToCache(currentPage);
        if (url) setPageDataUrl(url);
      }

      // 3. Pre-render neighbors (next and previous) for instant browsing
      renderPageToCache(currentPage + 1);
      if (currentPage > 1) renderPageToCache(currentPage - 1);
      
      // Extended pre-render: render next 2 and next 3 in idle time
      setTimeout(() => {
        renderPageToCache(currentPage + 2);
        renderPageToCache(currentPage + 3);
      }, 500);
    };

    showPage();
  }, [pdf, currentPage, renderPageToCache]);

  // Handle scale change (needs cache reset to update quality)
  useEffect(() => {
    if (pdf) {
      // Clear cache to re-render pages with new scale
      pageCache.current.forEach((url) => URL.revokeObjectURL(url));
      pageCache.current.clear();
      renderPageToCache(currentPage, true).then(url => {
        if (url) setPageDataUrl(url);
      });
    }
  }, [scale]); // Re-render when manual scale changes

  // Actions
  const nextPage = () => setCurrentPage(prev => (prev < numPages ? prev + 1 : 1));
  const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : numPages));
  
  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = PDF_PATH;
    link.download = "ims_digital_brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  if (loading) {
    return (
      <section className="carousel-section">
        <div className="container">
          <div className="loading-box">
            <div className="pulsating-loader"></div>
            <h2>Processing Document...</h2>
            <p>Our premium brochure is quite detailed, please wait a moment.</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="carousel-section">
        <div className="container">
          <div className="error-box">
            <h2 style={{ color: '#ff4d4d' }}>Resource Not Found</h2>
            <p>{error}</p>
            <div style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
              Ensure you have uploaded <code>carousel.pdf</code> to the <code>/public/pdfs/</code> folder.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-section" id="magazine-view">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="carousel-header"
        >
          <h1>Digital Brochure</h1>
          <p>Experience our institution through this interactive digital showcase.</p>
        </motion.div>

        <div className="pdf-viewer-wrapper">
          <div className={`pdf-viewer-container ${isFullscreen ? "is-fullscreen" : ""}`} ref={containerRef}>
            <button className="fullscreen-btn" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            
            <div className="pdf-display">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPage}
                  src={pageDataUrl}
                  alt={`Brochure Page ${currentPage}`}
                  className="pdf-page-image"
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button className="pdf-nav-btn pdf-nav-prev" onClick={prevPage} aria-label="Previous">
                <FaChevronLeft />
              </button>
              <button className="pdf-nav-btn pdf-nav-next" onClick={nextPage} aria-label="Next">
                <FaChevronRight />
              </button>
            </div>

            <div className="viewer-footer">
              <div className="page-info">
                Page {currentPage} of {numPages}
              </div>
              
              <div className="pdf-actions">
                <button className="action-btn" onClick={downloadPdf}>
                  <FaDownload /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Carousel;
