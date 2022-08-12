import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiTimeBomb } from "react-icons/gi";
import "./TimeComplexity.css";

function TimeComplexity({ code }) {
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const getResponse = async () => {
    if (code == "") {
      toast.error("Code is Empty.");
      return;
    }
    let res = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: code + '\n"""\nThe time complexity of this function is',
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    console.log("response", res.data.choices[0].text);
    const timeComplexity = "Time Complexity: " + res.data.choices[0].text;
    toast(timeComplexity);
  };
  return (
    <div>
      <GiTimeBomb className="time" onClick={() => getResponse()} title="Time Complexity" />
    </div>
  );
}

export default TimeComplexity;
