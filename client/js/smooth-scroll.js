 /**
  * Smooth Scroll
  * Smoothly scroll to the given target for the given duration.
  * Thanks to 'Hasen el Judy / @hasenj' for concept.
  */

document.smoothScroll = ((target, duration) => {
  target = Math.round(target);
  duration = Math.round(duration);

  // Reject if duration is below zero
  if (duration < 0) {
    return Promise.reject('Duration should be above zero');
  }

  // Immediately execute if duration is set to zero
  if (duration === 0) {
    window.scroll(0, target);
    return Promise.resolve();
  }

  // Set timing
  const startTime = Date.now();
  const endTime = startTime + duration;

  // Set distance
  const startTop = window.scrollY;
  const distance = target - startTop;
  console.log(target);

  // Based on //wikipedia.org/wiki/smoothstep
  const smoothStep = ((start, end, point) => {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  });

  return new Promise((resolve, reject) => {
    // Keep track of where the scroll should be.
    let previousTop = window.scrollY;

    // This is like a think function from a game loop
    const scrollFrame = (() => {
      // Reject if scroll has been interrupted
      if (window.scrollY != previousTop) {
        reject('Scroll was interrupted');
        return;
      }

      // Set scrollTop for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + (distance * point));
      window.scroll(0, frameTop);

      // Check if we are done
      if (now >= endTime) {
        resolve();
        return;
      }

      // Resolve if we hit a limit
      if (window.scrollY === previousTop && window.scrollY !== frameTop) {
        resolve();
        return;
      }
      previousTop = window.scrollY;

      // Schedule next frame execution
      setTimeout(scrollFrame, 0);
    });

    // Boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
});
