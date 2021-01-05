import { A4 } from 'components/constanst';

const breakLine = (node, offset = 0, startIndex = 0) => {
  console.log('call me');
  console.log('offset: ', offset);
  console.log('startIndex: ', startIndex);
  
  const target = document.getElementById(`view_${1000451}`);
  const div3 = Array.from(node.childNodes);
  
  const contain = document.createElement('div');
  const divider = document.createElement('div');
  const arrF = [];
  
  divider.classList.add('file-divider');
  contain.classList.add('contain-break');
  
  target.append(contain);
  target.append(divider);

  // loop arr elm
  div3.forEach(item => {
    if (item.offsetTop >= offset && item.offsetTop < A4.height + offset) {
      const elmClone = item.cloneNode(true);
      arrF.push(elmClone);
      startIndex += 1;
    }
  });

  arrF.forEach(item => {
    contain.append(item);
  });
  
  console.log('div3.length: ', div3.length);
  
  
  if (startIndex < div3.length) {
    breakLine(node, offset += A4.height, startIndex);
  }
};

export { breakLine };
