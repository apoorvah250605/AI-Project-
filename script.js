const popup = document.getElementById('popupResponse');
const emojiElem = document.getElementById('popupEmoji');
const imageElem = document.getElementById('popupImage');
const messageElem = document.getElementById('popupMessage');
const input = document.getElementById('userInput');

const responses = {
  happy: {
    emoji: "😄",
    message: "So glad you're feeling happy! Keep shining!",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60"
  },
  stressed: {
    emoji: "😰",
    message: "Take a break and breathe deeply. You've got this!",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=60"
  },
  calm: {
    emoji: "😌",
    message: "Keep embracing peace and calmness.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=60"
  },
  sad: {
    emoji: "😢",
    message: "It's okay to feel sad. Here’s a virtual hug 🤗",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=60"
  },
  anxious: {
    emoji: "😟",
    message: "Try some slow breathing exercises, you can overcome it!",
    image: "https://images.unsplash.com/photo-1507120878965-36d7c607b9a5?auto=format&fit=crop&w=400&q=60"
  },
  default: {
    emoji: "🙂",
    message: "Thank you for sharing. Remember to take care of yourself!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=60"
  }
};

function showResponse() {
  const userMood = input.value.toLowerCase().trim();
  const response = responses[userMood] || responses.default;

  emojiElem.textContent = response.emoji;
  messageElem.textContent = response.message;
  imageElem.src = response.image;
  imageElem.alt = "Relaxing scene related to " + userMood;

  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
    input.value = "";
  }, 4000);
}
