const ITS = [
  {
    id: "1",
    text: "A 'prop' is like a package being delivered from a parent component to a child. Look at the Profile component in the code. What is the name of the 'package' (prop) being passed to it?",
    showInput: true,
    answer: "profileData",
    incorrectMessage:
      "Not quite. Take another look at inside of the Profile component in the code. The 'package' (prop) being sent to it has a specific name. Try to find that name!",
    correctMessage:
      "That's right! The prop being passed to the Profile component is called 'profileData'. Props are how parent components can send data down to their children in React.",
  },
];

export default ITS;
