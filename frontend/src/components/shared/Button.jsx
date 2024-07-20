const Button = ({ children, icon: Icon, version, type = 'button', isDisabled = false, onClick }) => {
    const baseStyle = 'flex items-center gap-2 justify-center text-xs px-5 py-2 font-semibold rounded-lg shadow-md focus:outline-none transition duration-300';
    
    let versionStyle;
    if (version === 'primary') {
      versionStyle = 'bg-primaryColor hover:bg-secondaryColor focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-50';
    } else if (version === 'secondary') {
      versionStyle = 'bg-secondaryColor hover:bg-primaryColor focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-50';
    } 
    else if (version === 'danger') {
      versionStyle = 'bg-dangerColor hover:bg-red-600 focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-50';
    } 
    else if (version === 'warning') {
      versionStyle = 'bg-warningColor hover:bg-orange-400 focus:ring-2 focus:ring-warningColor focus:ring-opacity-50';
    } 
    
    else {
      versionStyle = 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50';
    }
  
    const disabledStyle = isDisabled ? 'cursor-not-allowed opacity-50 bg-red-300 hover:bg-red-400' : '';
  
    return (
      <button
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={`${baseStyle} ${versionStyle} ${disabledStyle}`}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </button>
    );
  };
  
  export default Button;
  