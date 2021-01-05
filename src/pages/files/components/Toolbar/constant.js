const PAGE_HEIGHT_PORTRAIT = 1130;
const PAGE_HEIGHT_LANDSCAPE = 840;

const generate = (lines, printArea, height = 0, isHorizontal) => {
  const PAGE_HEIGHT = isHorizontal
    ? PAGE_HEIGHT_LANDSCAPE
    : PAGE_HEIGHT_PORTRAIT;
  const createPage = (parrent) => {
    const pageTemplate = document.createElement("div");
    pageTemplate.setAttribute(
      "class",
      "form-content page-inside " + (isHorizontal ? "landscape" : "")
    );
    parrent.append(pageTemplate);
    const pageTemplate2 = document.createElement("div");
    pageTemplate.append(pageTemplate2);
    return pageTemplate2;
  };

  const appendTr = (trs = [], itemTemplate, line, height, page, printArea) => {
    let newLine = null;
    let tbody = null;
    trs.forEach((tr, index) => {
      if (height + tr.offsetHeight > PAGE_HEIGHT) {
        console.log(index);
        page = createPage(printArea);
        newLine = null;
        height = 0;
        tbody = null;
      }
      if (!newLine) {
        newLine = line.cloneNode();
        page.append(newLine);
      }
      if (!tbody) {
        let table = itemTemplate.cloneNode(true);
        newLine.append(table);
        tbody = table.getElementsByTagName("tbody")[0];
      }
      if (newLine && tbody) {
        height += tr.offsetHeight;
        tbody.append(tr.cloneNode(true));
      }
    });
    return { nPage: page, nHeight: height };
  };

  const appendTable = (table, line, item, height, page, printArea) => {
    let itemTemplate = item.cloneNode(true);
    let tbody = itemTemplate.getElementsByTagName("tbody");
    if (tbody?.length) {
      tbody[0].innerHTML = "";
    }
    let trs = Array.from(table.getElementsByTagName("tr"));
    return appendTr(trs, itemTemplate, line, height, page, printArea);
  };

  const appendLine = (line, height, page, printArea) => {
    if (!page) {
      page = createPage(printArea);
    }
    if (height + line.offsetHeight <= PAGE_HEIGHT) {
      //cộng line vào page hiện taị nếu chưa vượt quá
      page.append(line.cloneNode(true));
      height += line.offsetHeight;
      return {
        nHeight: height,
        nPage: page,
      };
    } //trường hợp vượt quá
    else {
      let newLine; //clone ra 1 line rỗng
      let childNodes = Array.from(line.childNodes); //get all child Node
      childNodes.forEach((item) => {
        if (height + item.offsetHeight > PAGE_HEIGHT) {
          let table = item.getElementsByTagName("tbody")[0];
          if (table) {
            let { nPage, nHeight } = appendTable(
              table,
              line,
              item,
              height,
              page,
              printArea
            );
            page = nPage;
            height = nHeight;
            newLine = null;
            return;
          } else {
            //neu item height vượt quá
            page = createPage(printArea); //tao moi 1 page moi
            newLine = null; //tao moi 1 line moi
            height = 0; //reset height
          }
        }
        if (!newLine) {
          newLine = line.cloneNode();
          page.append(newLine);
        }
        newLine.append(item.cloneNode(true)); //thêm item vào line
        height += item.offsetHeight; //update current height;
        if (height > PAGE_HEIGHT) height = height - PAGE_HEIGHT;
      });
      return {
        nHeight: height,
        nPage: page,
      };
    }
  };

  let index = 0;
  let page = null;
  do {
    if (lines[index]) {
      const { nHeight, nPage } = appendLine(
        lines[index],
        height,
        page,
        printArea
      );
      page = nPage;
      height = nHeight;
      index += 1;
    }
  } while (lines[index]);
  let paragraphs = printArea.getElementsByClassName("editing-content");
  for (var i = paragraphs.length - 1; i >= 0; --i) {
    if (
      paragraphs[i].getAttribute("contenteditable") == "true" &&
      !paragraphs[i].innerText
    )
      paragraphs[i].remove();
  }
};

const pullFileCss = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(file)
        .then((s) => {
          if (s.status === 200) return s.text();
          resolve("");
        })
        .then((text) => {
          resolve(text);
        })
        .catch((e) => {
          resolve("");
        });
    } catch (error) {
      console.log(error);
      resolve("");
    }
  });
};

const pullAllCss = async (html) => {
  try {
    let allStyle = Array.from(html.getElementsByTagName("link"))
      .filter((item) => item && item?.href?.indexOf(".css") !== -1)
      .map((item) => {
        console.log(item?.href);
        return pullFileCss(item?.href);
      });

    // let allStyle =
    //   html.match(/(?<=href=")[^"]+\.png/g)?.map((item) => {
    //     debugger;
    //     return pullFileCss(item);
    //   }) || [];
    return (
      (await Promise.all(allStyle).then((values) => values.join("\n\r"))) || ""
    );
  } catch (error) {
    console.log(error);
    return "";
  }
};

export { generate, pullAllCss, pullFileCss };
