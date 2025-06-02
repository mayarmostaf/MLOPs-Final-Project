function extractLandmarks(landmarks) {
  const flattened = [];
  for (const point of landmarks) {
    flattened.push(point.x);
    flattened.push(point.y);
  }
  return flattened;
}
async function getPredictedLabel(landmarks) {
  const processed_t = extractLandmarks(landmarks);

  try {
//    const response = await fetch("https://mlops-hand-gesture-maze-api-production-87c1.up.railway.app/predict", {
      const response = await fetch("https://mlops-hand-gesture-maze-api-production-ea81.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ landmarks: processed_t }),
    });

    if (!response.ok) {
      console.error("API call failed:", response.statusText);
      return null;
    }

    const data = await response.json();
    const apiLabel = data.prediction;

    const labelMap = {
      "like": "up",
      "dislike": "down",
      "stop": "left",
      "stop_inverted": "right"
    };

    const mappedLabel = labelMap[apiLabel] || null;

    console.log("API label:", apiLabel, "Mapped label:", mappedLabel);
    return mappedLabel;

  } catch (error) {
    console.error("Error calling API:", error);
    return null;
  }
}