interface Iprops {
  src: string;
  alt: string;
  className?: string;
}

function Img({ src, alt, className }: Iprops) {
  return <img src={src} alt={alt} className={className} />;
}

export default Img;
