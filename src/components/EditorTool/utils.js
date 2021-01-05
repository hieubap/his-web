export const bold = () => {
  document.execCommand("bold", false, "");
};

export const italic = () => {
  document.execCommand("italic", false, "");
};

export const underline = () => {
  document.execCommand("underline", false, "");
};

export const strikeThrough = () => {
  document.execCommand("strikeThrough", false, "");
};

export const mark = (color) => {
  document.execCommand("backColor", false, color);
};

export const setFontSize = (fontSize) => {
  document.execCommand("fontSize", false, fontSize);
};

export const setFontName = (fontName) => {
  document.execCommand("fontName", false, fontName);
};

export const justifyCenter = () => {
  document.execCommand("justifyCenter", false, "");
};

export const justifyLeft = () => {
  document.execCommand("justifyLeft", false, "");
};

export const justifyRight = () => {
  document.execCommand("justifyRight", false, "");
};

export const foreColor = (value) => {
  document.execCommand("foreColor", false, value);
};

export const handleShortKey = (e) => {
  if (e.ctrlKey) {
    switch (e.keyCode) {
      case 66:
        e.preventDefault();
        bold();
        break;
      case 73:
        e.preventDefault();
        italic();
        break;
      case 85:
        e.preventDefault();
        underline();
        break;
      default:
        break;
    }
  }
};
