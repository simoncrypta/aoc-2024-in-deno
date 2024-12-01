import { assertEquals } from "@std/assert";
import { getParseListOfLocations, sortLocationAscBySide, totalDifferenceBetweenRightAndLeft } from "./day1.ts";
import sinon from "https://cdn.skypack.dev/sinon@11.1.2?dts";

Deno.test("sortLocationAscBySideTest", () => {
  const listOfLocations = {leftList: [5,4,5], rightList: [4,5,4]};
  const expected = { leftList: [4, 5, 5], rightList: [4, 4, 5] };
  assertEquals(sortLocationAscBySide(listOfLocations), expected);
});

Deno.test("getParseListOfLocationsTest", async () => {
  const mockText = `1   2\n3   4\n5   6`;
  const mockReadTextFile = sinon.stub(Deno, 'readTextFile');
  mockReadTextFile.resolves(mockText);

  const expected = {leftList: [1,3,5], rightList: [2,4,6]};
  const result = await getParseListOfLocations();
  assertEquals(result, expected);
  mockReadTextFile.restore();
});


Deno.test("totalDifferenceBetweenRightAndLeftTest", () => {
  const input = { leftList: [4, 5, 5], rightList: [4, 4, 5] };
  const result = totalDifferenceBetweenRightAndLeft(input);
  assertEquals(result, 1);
});
