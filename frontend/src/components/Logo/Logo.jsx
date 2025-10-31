import logo from '../../assets/Logo/logo.png';

export default function Logo({width}){
    return (
        <img src={logo} alt="Logo" style={{width: width}} />
    )
}