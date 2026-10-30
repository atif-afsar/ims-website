import Img from "./Img";

/*
 * Row of photos from the media library for content sections:
 * the first photo gets the arch treatment, the rest sit beside it.
 *
 *   <PhotoStrip names={["robotics-lab-2", "robotics-lab-1", "robotics-lab-3"]} />
 */
const PhotoStrip = ({ names, className = "" }) => {
  const [lead, ...rest] = names;
  const cols = names.length === 2 ? "" : "sm:grid-cols-3";
  return (
    <div className={`my-8 grid grid-cols-2 gap-3 ${cols} ${className}`}>
      <Img
        name={lead}
        sizes="(min-width: 640px) 33vw, 50vw"
        // Two photos sit side by side; with three, the lead spans the top row on phones
        className={`rounded-t-[120px] rounded-b-2xl ${names.length === 2 ? "aspect-[4/5]" : "col-span-2 aspect-[4/3] sm:col-span-1 sm:aspect-[4/5]"}`}
      />
      {rest.map((name) => (
        <Img key={name} name={name} sizes="(min-width: 640px) 33vw, 50vw" className="aspect-[4/5] rounded-2xl" />
      ))}
    </div>
  );
};

export default PhotoStrip;
