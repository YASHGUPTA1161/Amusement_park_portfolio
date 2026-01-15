import { useEffect, useRef } from "react";

export function useDraggableWindow() {
  const ref = useRef(null);

  useEffect(() => {
    const elmnt = ref.current;
    if (!elmnt) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const header = document.getElementById(elmnt.id + "header") || elmnt;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }

    header.addEventListener("mousedown", dragMouseDown);

    return () => {
      header.removeEventListener("mousedown", dragMouseDown);
      closeDragElement();
    };
  }, []);

  return ref;
}
