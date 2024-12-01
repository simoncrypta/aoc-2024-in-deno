type parsedListOfLocations =  {
  leftList: number[];
  rightList: number[];
};

export async function getParseListOfLocations(): Promise<parsedListOfLocations> {
  const text = await Deno.readTextFile("input.txt");
  const lines = text.split("\n");
  const leftList: number[] = [];
  const rightList: number[] = [];

  for (const line of lines) {
    const [left, right] = line.split("   ").map(id => parseInt(id));
    if (!Number.isNaN(left) && !Number.isNaN(right)) {
      leftList.push(left);
      rightList.push(right);
    } else {
      throw new Error("Invalid input");
    }
  }

  return { leftList, rightList };
}

export function sortLocationAscBySide(listOfLocations: parsedListOfLocations): parsedListOfLocations {
  const orderedLeftList = listOfLocations.leftList.sort((a, b) => a - b);
  const orderedRightList = listOfLocations.rightList.sort((a, b) => a - b);
  return { leftList: orderedLeftList, rightList: orderedRightList };
}

export function totalDifferenceBetweenRightAndLeft(orderedList: parsedListOfLocations): number {
  let totalDifference: number = 0;
  for(let i = 0; i < orderedList.leftList.length; i++) {
    const difference = Math.abs(orderedList.leftList[i] - orderedList.rightList[i]);
    totalDifference += difference;
  }
 return totalDifference;
}

if (import.meta.main) {
  const listOfLocations = await getParseListOfLocations();
  const orderedLocations = sortLocationAscBySide(listOfLocations);
  const answer = totalDifferenceBetweenRightAndLeft(orderedLocations);
  console.log(answer);
}