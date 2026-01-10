// characterController.js
import gsap from "gsap";

const JUMP_DURATION = 0.8;
const MOVE_DISTANCE = 5;

export function createCharacterController(character, respawnCharacter) {
  function moveCharacter(targetPos, targetRotation) {
    character.isMoving = true;

    const tl = gsap.timeline({
      onComplete: () => {
        character.isMoving = false;
        if (character.instance.position.y < -10) {
          respawnCharacter();
        }
      },
    });

    tl.to(
      character.instance.position,
      {
        x: targetPos.x,
        z: targetPos.z,
        duration: JUMP_DURATION,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      character.instance.rotation,
      {
        y: targetRotation,
        duration: JUMP_DURATION * 0.5,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      character.instance.position,
      {
        y: "+=3",
        duration: JUMP_DURATION / 2,
        ease: "power1.out",
      },
      0
    );

    tl.to(
      character.instance.position,
      {
        y: targetPos.y,
        duration: JUMP_DURATION / 2,
        ease: "power1.in",
      },
      JUMP_DURATION / 2
    );

    tl.to(
      character.instance.scale,
      {
        x: 0.9,
        y: 1.2,
        z: 0.9,
        duration: JUMP_DURATION * 0.2,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      character.instance.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: JUMP_DURATION * 0.3,
        ease: "elastic.out(1, 0.5)",
      },
      JUMP_DURATION * 0.7
    );
  }

  function handleKeyDown(e) {
    if (!character.instance || character.isMoving) return;

    const key = e.key.toLowerCase();
    const currentPos = character.instance.position.clone();
    const targetPos = currentPos.clone();
    let targetRotation = character.instance.rotation.y;

    switch (key) {
      case "a":
      case "arrowup":
        targetPos.z += MOVE_DISTANCE;
        targetRotation = 0;
        break;
      case "d":
      case "arrowdown":
        targetPos.z -= MOVE_DISTANCE;
        targetRotation = Math.PI;
        break;
      case "s":
      case "arrowleft":
        targetPos.x += MOVE_DISTANCE;
        targetRotation = Math.PI / 2;
        break;
      case "w":
      case "arrowright":
        targetPos.x -= MOVE_DISTANCE;
        targetRotation = -Math.PI / 2;
        break;
      case "r":
        respawnCharacter();
        return;
      default:
        return;
    }

    moveCharacter(targetPos, targetRotation);
  }

  return { handleKeyDown };
}
