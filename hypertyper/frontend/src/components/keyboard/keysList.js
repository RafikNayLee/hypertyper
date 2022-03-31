const DEFAULT_KEYS = [
  { id: "b-1-1", hand: "left", finger: "f-5" },
  { id: "b-3-2", x: "147", y: "195", hand: "left", finger: "f-5" },
  { id: "b-3-3", x: "246", y: "195", hand: "left", finger: "f-4" },
  { id: "b-4-2", x: "196", y: "285", hand: "left", finger: "f-5" },
  { id: "b-5-2", x: "246", y: "374", hand: "left", finger: "f-5" },
  { id: "b-5-3", x: "344", y: "374", hand: "left", finger: "f-4" },
  { id: "b-5-4", x: "443", y: "374", hand: "left", finger: "f-3" },
  { id: "b-5-5", x: "541", y: "374", hand: "left", finger: "f-2" },
  { id: "b-5-6", x: "640", y: "374", hand: "left", finger: "f-2" },
  { id: "b-5-7", x: "738", y: "374", hand: "right", finger: "f-2" },
  { id: "b-5-8", x: "837", y: "374", hand: "right", finger: "f-2" },
  { id: "b-5-9", x: "936", y: "374", hand: "right", finger: "f-3" },
  { id: "b-5-10", x: "1034", y: "374", hand: "right", finger: "f-4" },
  { id: "b-5-11", x: "1130", y: "374", hand: "right", finger: "f-5" },
  { id: "b-4-3", x: "294", y: "285", hand: "left", finger: "f-4" },
  { id: "b-4-4", x: "394", y: "285", hand: "left", finger: "f-3" },
  { id: "b-4-5", x: "494", y: "285", hand: "left", finger: "f-2" },
  { id: "b-4-6", x: "593", y: "285", hand: "left", finger: "f-2" },
  { id: "b-4-7", x: "690", y: "285", hand: "right", finger: "f-2" },
  { id: "b-4-8", x: "788", y: "285", hand: "right", finger: "f-2" },
  { id: "b-4-9", x: "886", y: "285", hand: "right", finger: "f-3" },
  { id: "b-4-10", x: "984", y: "285", hand: "right", finger: "f-4" },
  { id: "b-4-11", x: "1084", y: "285", hand: "right", finger: "f-5" },
  { id: "b-6-6", x: "1117", y: "464", width: "100", hand: "right" },
  {
    id: "b-6-5",
    x: "1001",
    y: "464",
    width: "100",
    hand: "right",
    finger: "f-1",
  },
  {
    id: "b-6-3",
    x: "261",
    y: "464",
    width: "100",
    hand: "left",
    finger: "f-1",
  },
  { id: "b-6-2", x: "147", y: "464", width: "100", hand: "left" },
  { id: "b-6-1", y: "464", width: "134", hand: "left", finger: "f-5" },
  { id: "b-5-1", y: "374", width: "231", hand: "left", finger: "f-5" },
  {
    id: "b-6-4",
    x: "378",
    y: "464",
    width: "607",
    hand: "left",
    finger: "f-1",
  },
  { id: "b-4-12", x: "1181", y: "285", hand: "right", finger: "f-5" },
  {
    id: "b-6-9",
    x: "1576",
    y: "464",
    width: "183",
    hand: "right",
    finger: "f-5",
  },
  { id: "b-5-13", x: "1576", y: "371", hand: "right", finger: "f-2" },
  { id: "b-5-15", x: "1773", y: "371", hand: "right", finger: "f-4" },
  { id: "b-5-14", x: "1675", y: "371", hand: "right", finger: "f-3" },
  { id: "b-4-14", x: "1576", y: "281", hand: "right", finger: "f-2" },
  { id: "b-3-15", x: "1576", y: "191", hand: "right", finger: "f-2" },
  { id: "b-3-16", x: "1675", y: "192", hand: "right", finger: "f-3" },
  { id: "b-3-17", x: "1773", y: "192", hand: "right", finger: "f-4" },
  { id: "b-4-16", x: "1773", y: "281", hand: "right", finger: "f-4" },
  { id: "b-4-15", x: "1675", y: "281", hand: "right", finger: "f-3" },
  { id: "b-6-10", x: "1773", y: "464", hand: "right", finger: "f-4" },
  { id: "b-6-7", x: "1249", y: "463", width: "96", hand: "right" },
  { id: "b-3-4", x: "344", y: "195", hand: "left", finger: "f-3" },
  { id: "b-3-5", x: "442", y: "195", hand: "left", finger: "f-2" },
  { id: "b-3-6", x: "542", y: "195", hand: "left", finger: "f-2" },
  { id: "b-3-7", x: "640", y: "195", hand: "right", finger: "f-2" },
  { id: "b-3-8", x: "738", y: "195", hand: "right", finger: "f-2" },
  { id: "b-3-9", x: "836", y: "195", hand: "right", finger: "f-3" },
  { id: "b-3-10", x: "935", y: "195", hand: "right", finger: "f-4" },
  { id: "b-3-11", x: "1033", y: "195", hand: "right", finger: "f-5" },
  { id: "b-3-12", x: "1133", y: "195", hand: "right", finger: "f-5" },
  { id: "b-3-13", x: "1230", y: "195", hand: "right", finger: "f-5" },
  {
    id: "b-3-14",
    x: "1330",
    y: "195",
    width: "182",
    hand: "right",
    finger: "f-5",
  },
  {
    id: "b-6-8",
    x: "1363",
    y: "463",
    width: "148",
    hand: "right",
    finger: "f-5",
  },
  {
    id: "b-4-13",
    x: "1272",
    y: "285",
    width: "240",
    hand: "right",
    finger: "f-5",
  },
  {
    id: "b-5-12",
    x: "1230",
    y: "374",
    width: "282",
    hand: "right",
    finger: "f-5",
  },
  {
    id: "b-2-14",
    x: "1282",
    y: "104",
    width: "230",
    hand: "right",
    finger: "f-5",
  },
  { id: "b-3-1", y: "195", width: "134", hand: "left", finger: "f-5" },
  { id: "b-4-1", y: "285", width: "184", hand: "left", finger: "f-5" },
  { id: "b-2-2", x: "100", y: "103", hand: "left", finger: "f-5" },
  { id: "b-2-3", x: "195", y: "103", hand: "left", finger: "f-4" },
  { id: "b-2-1", y: "103", hand: "left", finger: "f-5" },
  { id: "b-2-4", x: "296", y: "103", hand: "left", finger: "f-3" },
  { id: "b-2-5", x: "395", y: "103", hand: "left", finger: "f-2" },
  { id: "b-2-6", x: "493", y: "103", hand: "left", finger: "f-2" },
  { id: "b-2-7", x: "591", y: "103", hand: "right", finger: "f-2" },
  { id: "b-2-8", x: "689", y: "103", hand: "right", finger: "f-2" },
  { id: "b-2-9", x: "787", y: "103", hand: "right", finger: "f-3" },
  { id: "b-2-10", x: "885", y: "103", hand: "right", finger: "f-4" },
  { id: "b-2-11", x: "983", y: "103", hand: "right", finger: "f-5" },
  { id: "b-2-12", x: "1081", y: "103", hand: "right", finger: "f-5" },
  { id: "b-2-13", x: "1179", y: "103", hand: "right", finger: "f-5" },
  { id: "b-1-2", x: "212", hand: "left", finger: "f-5" },
  { id: "b-1-3", x: "311", hand: "left", finger: "f-4" },
  { id: "b-1-4", x: "409", hand: "left", finger: "f-3" },
  { id: "b-1-5", x: "509", hand: "left", finger: "f-2" },
  { id: "b-1-6", x: "672", hand: "left", finger: "f-2" },
  { id: "b-1-7", x: "773", hand: "right", finger: "f-2" },
  { id: "b-1-8", x: "870", hand: "right", finger: "f-2" },
  { id: "b-1-9", x: "968", hand: "right", finger: "f-3" },
  { id: "b-1-10", x: "1133", hand: "right", finger: "f-4" },
  { id: "b-1-11", x: "1231", hand: "right", finger: "f-5" },
  { id: "b-1-12", x: "1330", hand: "right", finger: "f-5" },
  { id: "b-1-13", x: "1428", hand: "right", finger: "f-5" },
];
console.log(
  DEFAULT_KEYS.map((key) => key.id)
    .sort()
    .reduce(
      (total, id) => ({
        ...total,
        [id]: {
          label: id,
        },
      }),
      {}
    )
);
export default DEFAULT_KEYS;
