import { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Progress,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { writeContract } from "@wagmi/core";
import { useContract } from "../ContractContext";
import { useNavigate } from "react-router-dom";


interface Props {
    questionNumber: number; 
}
  
const options = [
  [
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "La lune éclaire la nuit, et les étoiles brillent.",
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "Le vent souffle fort, et les arbres se balancent.",
  ],
  [
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "La lune éclaire la nuit, et les étoiles brillent.",
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "Le vent souffle fort, et les arbres se balancent.",
  ],
  [
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "La lune éclaire la nuit, et les étoiles brillent.",
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "Le vent souffle fort, et les arbres se balancent.",
  ],
  [
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "La lune éclaire la nuit, et les étoiles brillent.",
    "Le soleil brille dans le ciel, et les oiseaux chantent.",
    "Le vent souffle fort, et les arbres se balancent.",
  ],
];

export const TestStudent = () => {
  const { contractAbi, contractAddress, contract } = useContract();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0); // Added state for the score
  const totalQuestions = 4;
  const progress = (currentQuestion / totalQuestions) * 100;
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // If all questions are answered, perform submission logic
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Perform submission logic, e.g., sending the score to a server
    console.log("Submitting score:", score);
    // implement logic take_test as student.
    try {
      // Smart contract write
      const { hash } = await writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "takeMentorTest",
        args: [score],
      });

      console.log("Smart contract hash:", hash);

      // After signing, link to the dashboard
      navigate("/dashboard"); // Replace "/dashboard" with your actual dashboard route
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle the error, e.g., show an error message to the user
    }

    // Reset the state if needed
    setCurrentQuestion(1);
    setScore(0);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleAnswer = () => {
    // Logic to determine if the answer is correct
    // For example, assuming the correct answer is always the first option
    if (
      currentQuestion <= options.length &&
      options[currentQuestion - 1][0] ===
        "Le soleil brille dans le ciel, et les oiseaux chantent."
    ) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  return (
    <Card
      w={{ base: "300px", md: "450px", lg: "600px" }}
      bgColor="white"
      p={"3"}
      className="font">
      <CardBody>
        <div className="flex justify-between items-center mb-6">
          <IconButton
            aria-label={"go back"}
            icon={<ChevronLeftIcon fontSize={30} />}
            color="blue"
            variant="unstyled"
            onClick={handlePrevQuestion}></IconButton>
          <Box
            className="flex space-x-2 px-3 py-1 items-center"
            bg={"pink"}
            borderRadius={"10"}>
            <img src="/timer.svg" className="w-5 h-5" />
            <p className="text-black text-base font-medium">03:58</p>
          </Box>
        </div>
        <div>
          <p className="text-center text-black font-medium ">
            {currentQuestion} of {totalQuestions}
          </p>
          <Progress
            value={progress}
            size="sm"
            borderRadius={6}
            bg={"gray"}
            colorScheme="green"
            className="my-3"
          />
        </div>
        <div>
          <Questions questionNumber={currentQuestion} />
          <div className="">{score}</div>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          className="mt-1 mb-2 w-full rounded-smi bg-gray-900 px-36 py-6 text-white h-10 text-lg font-body-2-body-2 font-thin hover:bg-black mx-auto "
          onClick={handleAnswer}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Questions: React.FC<Props> = ({ questionNumber }) => {
  // Example questions array
  const questions = [
    "Translate the following English sentence into French",
    "Translate the following English sentence into Arabic",
    "Translate the following English sentence into Spanish",
    "Translate the following English sentence into English",
  ];

  const explainer = [
    "The sun is shining brightly in the sky, and the birds are singing.",
    "The sun is shining brightly in the sky, and the birds .",
    "The sun is shining brightly in the sky, and .",
    "The sun is shining brightly in the sky.",
  ];

  return (
    <>
      {/* Question */}
      <div className="space-y-2 text-black mb-6">
        <p className="font-semibold mt-6 ">{questions[questionNumber - 1]}</p>
        <p className="text-gray1-100 italic">
        {explainer[questionNumber - 1]}
        </p>
      </div>
      {/* Options */}
      <div className="space-y-4">
        {options[questionNumber - 1].map((option, index) => (
          <div
            key={index}
            className=" text-black1 font-semibold border-2 border-gray1-100 rounded-md p-5 cursor-pointer"
            onClick={() => console.log(option)}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>
    </>
  );
};
