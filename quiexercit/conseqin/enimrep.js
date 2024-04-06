function handleTouchMove(evt) {
  if (!isDragging) {
    return;
  }

  const {clientX, clientY} = evt.touches[0];
  const dx = clientX - startX;
  const dy = clientY - startY;

  // Update the element's position
  element.style.left = `${initialX + dx}px`;
  element.style.top = `${initialY + dy}px`;
}
