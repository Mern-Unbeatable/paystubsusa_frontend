import TemplateLogo from "./TemplateLogo";

/**
 * Uploaded company logo fitted inside a `boxWidth` × `boxHeight` area,
 * or the neutral placeholder mark when no logo was provided.
 */
const CompanyLogo = ({ src, boxWidth, boxHeight, placeholderWidth, align = "left" }) => {
  if (!src) return <TemplateLogo width={placeholderWidth} />;

  return (
    <div
      style={{
        width: boxWidth,
        height: boxHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: align === "left" ? "flex-start" : "center",
      }}
    >
      <img
        src={src}
        alt=""
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default CompanyLogo;
