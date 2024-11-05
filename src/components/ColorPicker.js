import { useState } from "react";



const ColorPicker = ({getColor}) => {

    

    const colors = [
        "#FF5733", // Vibrant red-orange
        "#33FF57", // Bright green
        "#3357FF", // Bold blue
        "#FF33A1", // Hot pink
        "#FF8C33", // Orange
        "#33FFF3", // Aqua
        "#D433FF", // Purple
        "#FFD633", // Yellow
        "#FF3366", // Pink-red
        "#33FF9A", // Light green
        "#8C33FF", // Violet
        "#FFC433", // Golden yellow
        "#33A1FF", // Sky blue
        "#FF5733", // Coral
        "#33FFD1", // Mint green
        "#FF5733", // Red-orange
        "#B833FF", // Deep purple
        "#FFB833", // Peach
        "#33FF57", // Lime
        "#FF3333"  // Red
      ];
      const [selectedColor, setSelectedColor] = useState('white');
      const [isExtended, setIsExtended] = useState(false);


      const extendColorPicker = () =>{
        setIsExtended(true);
      }
      const minimizeColorPicker = () =>{
        setIsExtended(false);
      }
      const pickColor = (color) =>{
        setSelectedColor(color);
        minimizeColorPicker();
        getColor(color);
      }
    return ( 
        <div className={`color-picker ${isExtended ? 'extend-color-picker' : ''}`}>
            {isExtended ? (
                <div className="header" onClick={minimizeColorPicker}>
                    <img className="close-button icon" src="/icons/close.svg" alt="close color picker"></img>
                    <p>Pick a color</p>
                </div>
            ) : (
                <div className="header" onClick={extendColorPicker}>
                    <div className="selected-color" style={{backgroundColor: selectedColor}}></div>
                </div>
            )}
            <div className="colors-container">
                {colors.map((color,index)=>(
                    <div className="color" style={{backgroundColor: color}} onClick={()=>pickColor(color)} key={color+index}></div>
                ))}
            </div>
        </div>
     );
}
 
export default ColorPicker;