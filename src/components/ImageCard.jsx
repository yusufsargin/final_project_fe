import React, { useEffect, useRef } from "react";

export const ImageCard = ({ imageId = "image_1673358525000", labels }) => {
  const canvasRef = useRef();
  const WIDTH = 640;
  const HEIGHT = 480;

  const drawRectangle = () => {
    const context = canvasRef.current.getContext("2d");

    context.strokeStyle = "green";
    context.lineWidth = 2;
    context.font = "14px serif";

    if (labels && labels.length > 0) {
      const Instances = labels.map((item) => ({ instanceContainer: item.Instances, name: item.Name }));

      Instances.map(({ instanceContainer: container, name }) => {
        if (container && container.length > 0) {
          container.map((instance) => {
            const { BoundingBox } = instance;
            const ratio = 1;

            const x = BoundingBox.Left * WIDTH * ratio;
            const y = BoundingBox.Top * HEIGHT * ratio;
            const width = BoundingBox.Width * WIDTH * ratio;
            const height = BoundingBox.Height * HEIGHT * ratio;

            context.strokeRect(x, y, width, height);
            context.fillText(name, x, y);
          });
        }
      });
    }
  };

  useEffect(() => {
    drawRectangle();
  }, []);

  return (
    <div>
      <canvas
        width={WIDTH}
        height={HEIGHT}
        ref={canvasRef}
        style={{
          background: "url('" + "https://kvs-images.s3.eu-central-1.amazonaws.com/" + imageId + "')",
        }}
      />
    </div>
  );
};
