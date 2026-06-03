export const openBookingWidget = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  const qBtn = document.querySelector('.quandoo-button') as HTMLElement;
  if (qBtn) {
    qBtn.click();
  } else {
    window.open('https://www.quandoo.it/place/ristorante-da-lucia-48062', '_blank');
  }
};
