const rotateCollidedBalls = function(velocity, angle) {

    const velocityAfterRotation = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return velocityAfterRotation;
}
const collisionDetection = function(currentBall, nextBall) {

    const verticalVelDiff = currentBall.velocity.x - nextBall.velocity.x;
    const horVelDiff = currentBall.velocity.y - nextBall.velocity.y;
    const verticalDist = nextBall.x - currentBall.x;
    const horizontalDist = nextBall.y - currentBall.y;

    // Prevent overlap of currentBall
    if (verticalVelDiff * verticalDist + horVelDiff * horizontalDist >= 0) {
        const angle = -Math.atan2(nextBall.y - currentBall.y, nextBall.x - currentBall.x);
        const m1 = currentBall.mass;
        const m2 = nextBall.mass;
        // initial velocities after rotation 
        const intVelOfCurrentBall = rotateCollidedBalls(currentBall.velocity, angle);
        const intVelOfNextBall = rotateCollidedBalls(nextBall.velocity, angle);
        // Final Velocities 
        const finalVelOfCurrentBall = { x: intVelOfCurrentBall.x * (m1 - m2) / (m1 + m2) + intVelOfNextBall.x * 2 * m2 / (m1 + m2), y: intVelOfCurrentBall.y };
        const finalVelOfNextBall = { x: intVelOfNextBall.x * (m1 - m2) / (m1 + m2) + intVelOfCurrentBall.x * 2 * m2 / (m1 + m2), y: intVelOfNextBall.y };
        // Final velocity after re-rotating
        const finalVelCurrent = rotateCollidedBalls(finalVelOfCurrentBall, -angle);
        const finalVelNext = rotateCollidedBalls(finalVelOfNextBall, -angle);

        currentBall.velocity.x = finalVelCurrent.x;
        currentBall.velocity.y = finalVelCurrent.y;

        nextBall.velocity.x = finalVelNext.x;
        nextBall.velocity.y = finalVelNext.y;
    }
}