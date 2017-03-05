 /**
  * Smooth Scroll
  * Smoothly scroll element to the given target for the given duration.
  * Thanks to 'Hasen el Judy / @hasenj' for concept.
  */

document.smoothScroll = ((element, target, duration) => {
  target = Math.round(target);
  duration = Math.round(duration);

  // Reject if duration is below zero
  if (duration < 0) {
    return Promise.reject('Duration should be above zero');
  }

  // Immediately execute if duration is set to zero
  if (duration === 0) {
    element.scrollTop = target;
    return Promise.resolve();
  }

  // Set timing
  const startTime = Date.now();
  const endTime = startTime + duration;

  // Set distance
  const startTop = element.scrollTop;
  const distance = target - startTop;

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
    // Keep track of where the element's scrollTop should be.
    let previousTop = element.scrollTop;

    // This is like a think function from a game loop
    const scrollFrame = (() => {
      // Reject if scroll has been interrupted
      if (element.scrollTop != previousTop) {
        reject('Scroll was interrupted');
        return;
      }

      // Set scrollTop for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + (distance * point));
      element.scrollTop = frameTop;

      // Check if we are done
      if (now >= endTime) {
        resolve();
        return;
      }

      // Resolve if we hit a limit
      if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
        resolve();
        return;
      }
      previousTop = element.scrollTop;

      // Schedule next frame execution
      setTimeout(scrollFrame, 0);
    });

    // Boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
});
