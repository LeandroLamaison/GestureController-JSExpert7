
export default class HandGestureView {
  loop (fn) {
    requestAnimationFrame(fn)
  }

  canScrollUp (top) {
    return top > 0 
  }

  canScrollDown (top) {
    return top < document.body.clientHeight
  }

  hasScrolledDown(top) {
    return Math.ceil(window.scrollY) >= top
  }

  hasScrolledUp(top) {
    return Math.floor(window.scrollY) <= top
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'smooth'
    })
  }
}