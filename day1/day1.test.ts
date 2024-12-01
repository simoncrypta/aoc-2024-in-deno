import { assertEquals } from "@std/assert";
import { getParseListOfLocations, sortLocationAscBySide, totalDifferenceBetweenRightAndLeft } from "./day1.ts";
import sinon from "https://cdn.skypack.dev/sinon@11.1.2?dts";

Deno.test("sortLocationAscBySideTest", () => {
  const listOfLocations = [[1, 2], [3, 4], [5, 6]];
  const expected = { orderedLeftList: [1, 3, 5], orderedRightList: [2, 4, 6] };
  assertEquals(sortLocationAscBySide(listOfLocations), expected);
});

Deno.test("getParseListOfLocationsTest", async () => {
  const mockText = `1   2\n3   4\n5   6`;
  const mockReadTextFile = sinon.stub(Deno, 'readTextFile');
  mockReadTextFile.resolves(mockText);

  const expected = [[1, 2], [3, 4], [5, 6]];
  const result = await getParseListOfLocations();
  assertEquals(result, expected);
  mockReadTextFile.restore();
});


Deno.test("totalDifferenceBetweenRightAndLeftTest", () => {
  const orderedLeftList = [1, 3, 5];
  const orderedRightList = [2, 4, 6];
  const result = totalDifferenceBetweenRightAndLeft(orderedLeftList, orderedRightList);
  assertEquals(result, 3);
});
