import { useCallback, useEffect } from "react";
import axios from "axios";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

export default function Autosave({ data, saveFunction }) {
  const saveExperimentData = useCallback((newExperimentData) => {
    saveFunction(newExperimentData);
    console.log("Saved successfully!");
  }, []);

  const debouncedSave = useCallback(
    setInterval(async (newExperimentData) => {
      saveExperimentData(newExperimentData);
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  useEffect(() => {
    if (data) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);

  return null;
}
