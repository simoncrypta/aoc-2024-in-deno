export  async function getParseListOfLocations() {
  const text = await Deno.readTextFile("input.txt");
  const listOfLocations: number[][] = [];
  text.split("\n").forEach((setOflocations: string) => {
    const pairOfLocationId = setOflocations.split("   ").map((locationId: string) => {
      if (!Number.isNaN(parseInt(locationId))) {
        return parseInt(locationId);
      } else {
        throw new Error("Invalid input");
      }
    });
    if (pairOfLocationId) {
      listOfLocations.push(pairOfLocationId);
    }
  });
  return listOfLocations;
}

export function sortLocationAscBySide(listOfLocations: number[][]) {
  const leftList = listOfLocations.map((pairOfLocationId: number[]) => pairOfLocationId[0]);
  const rightList = listOfLocations.map((pairOfLocationId: number[]) => pairOfLocationId[1]);
  const orderedLeftList = leftList.sort((a, b) => a - b);
  const orderedRightList = rightList.sort((a, b) => a - b);
  return { orderedLeftList, orderedRightList };
}

export function totalDifferenceBetweenRightAndLeft(orderedLeftList: number[], orderedRightList: number[]) {
  let totalDifference: number = 0;
  for(let i = 0; i < orderedLeftList.length; i++) {
    const difference = Math.abs(orderedRightList[i] - orderedLeftList[i]);
    totalDifference += difference;
  }
 return totalDifference;
}

if (import.meta.main) {
  const listOfLocations: number[][] = await getParseListOfLocations();
  const { orderedLeftList, orderedRightList } = sortLocationAscBySide(listOfLocations);
  const answer = totalDifferenceBetweenRightAndLeft(orderedLeftList, orderedRightList);
  console.log(answer);
}