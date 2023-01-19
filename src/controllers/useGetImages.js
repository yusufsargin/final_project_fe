import { useState, useCallback } from "react";
import { fetchObjects } from "../services";

export const useGetImages = () => {
  const [objectList, setObjectList] = useState();
  const [loading, setLoading] = useState(false);

  const getObjects = useCallback(async (startTime, endTime) => {
    const objects = await fetchObjects(startTime, endTime);

    setObjectList(objects.data);

    return objects.data;
  }, []);

  return {
    getObjects,
    objectList,
  };
};
