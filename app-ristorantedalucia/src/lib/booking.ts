export const openBookingWidget = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  window.dispatchEvent(new Event('open-booking'));
};
