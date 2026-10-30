import { Children, Fragment, isValidElement, useEffect } from "react";

/*
 * Minimal drop-in for react-helmet-async's <Helmet>.
 *
 * React 19 hoists <title>/<meta>/<link> into <head> but does not dedupe them
 * against the static tags in index.html, so every page ended up with two
 * titles and two canonicals. Instead, this updates the existing head tags in
 * place and restores the index.html defaults when the page unmounts.
 *
 * Supports: <title>, <meta name|property>, <link rel="canonical">,
 * <script type="application/ld+json">.
 */

const flatten = (children) =>
  Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child)) return [];
    if (child.type === Fragment) return flatten(child.props.children);
    return [child];
  });

const textOf = (children) => Children.toArray(children).join("");

const metaSelector = (props) =>
  props.name ? `meta[name="${props.name}"]` : `meta[property="${props.property}"]`;

const Helmet = ({ children }) => {
  const elements = flatten(children);
  // Stable dependency so the effect only reruns when the tags actually change
  const signature = JSON.stringify(
    elements.map((el) => [el.type, el.props.name, el.props.property, el.props.rel, el.props.content, el.props.href, textOf(el.props.children)])
  );

  useEffect(() => {
    const restore = [];

    for (const el of elements) {
      const { type, props } = el;

      if (type === "title") {
        const previous = document.title;
        document.title = textOf(props.children);
        restore.push(() => (document.title = previous));
      } else if (type === "meta" && (props.name || props.property)) {
        let tag = document.head.querySelector(metaSelector(props));
        if (tag) {
          const previous = tag.getAttribute("content");
          tag.setAttribute("content", props.content ?? "");
          restore.push(() => tag.setAttribute("content", previous));
        } else {
          tag = document.createElement("meta");
          tag.setAttribute(props.name ? "name" : "property", props.name || props.property);
          tag.setAttribute("content", props.content ?? "");
          document.head.appendChild(tag);
          restore.push(() => tag.remove());
        }
      } else if (type === "link" && props.rel === "canonical") {
        let tag = document.head.querySelector('link[rel="canonical"]');
        if (tag) {
          const previous = tag.getAttribute("href");
          tag.setAttribute("href", props.href);
          restore.push(() => tag.setAttribute("href", previous));
        } else {
          tag = document.createElement("link");
          tag.rel = "canonical";
          tag.href = props.href;
          document.head.appendChild(tag);
          restore.push(() => tag.remove());
        }
      } else if (type === "script" && props.type === "application/ld+json") {
        const tag = document.createElement("script");
        tag.type = "application/ld+json";
        tag.text = textOf(props.children);
        document.head.appendChild(tag);
        restore.push(() => tag.remove());
      }
    }

    return () => restore.reverse().forEach((undo) => undo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return null;
};

export { Helmet };
export default Helmet;
