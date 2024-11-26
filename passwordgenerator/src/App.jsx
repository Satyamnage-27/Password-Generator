import { useCallback, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-+=[]{}`";

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Function to copy password
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    } else {
      alert("Generate a password first!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 to-gray-900 text-gray-200 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center mb-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition">
          <input
            type="text"
            value={password}
            className="flex-1 p-3 text-gray-300 bg-transparent outline-none placeholder-gray-500"
            placeholder="Your generated password"
            readOnly
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-150"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Password Length: <strong>{length}</strong>
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full accent-blue-500 hover:accent-blue-600 focus:accent-blue-700"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        {/* Checkbox Options */}
        <div className="flex flex-col gap-3 mb-4">
          <label className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setnumberAllowed((prev) => !prev)}
              className="accent-blue-500 hover:accent-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            Include Numbers
          </label>
          <label className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setcharAllowed((prev) => !prev)}
              className="accent-blue-500 hover:accent-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            Include Special Characters
          </label>
        </div>

        {/* Generate Button */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-150 hover:scale-105"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
