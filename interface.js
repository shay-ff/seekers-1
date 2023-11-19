const ort = require("onnxruntime-node");

async function testList(list) {
  const session = await ort.InferenceSession.create("./model.onnx");
  const dataA = Float32Array.from(list);
  const tensorA = new ort.Tensor("float32", dataA, [1, 11]);
  const dataB = Float32Array.from([0, 0]);
  
  const feeds = { dense_10_input: tensorA };
  const results = await session.run(feeds);
  return results;
}


async function testFunc()
{
  const maxList = [0, 0.44, 1, 0.43, 0, 0, 0, 1, 0, 5, 17];
  let output = await testList(maxList);
  console.log("in interface");
  console.log(output)
}
testFunc();
module.exports = { testList };
