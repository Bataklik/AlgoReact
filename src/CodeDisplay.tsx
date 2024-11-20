interface CodeDisplayProps {
  highlightedLine: number;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  highlightedLine,
}) => {
  const codeLines = [
    "def selection_sort(a):",
    "    for i in range(len(a) - 1):",
    "        _min = a[i]",
    "        _pos = i",
    "        for j in range(i + 1, len(a)):",
    "            if a[j] < _min:",
    "                _min = a[j]",
    "                _pos = j",
    "        a[_pos], a[i] = a[i], _min",
  ];

  return (
    <div
      style={{
        fontFamily: "monospace",
        padding: "10px",
        background: "#f4f4f4",
        borderRadius: "5px",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
      }}
    >
      {codeLines.map((line, index) => (
        <div
          key={index}
          style={{
            backgroundColor:
              index === highlightedLine ? "#dfe7fd" : "transparent",
            padding: "5px 10px",
            borderRadius: "3px",
            whiteSpace: "pre-wrap", // Voorkomt dat de spaties weggelaten worden
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};
