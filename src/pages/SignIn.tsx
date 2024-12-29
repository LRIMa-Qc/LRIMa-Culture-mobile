import Grass from "../assets/Grass2.svg";

export default function SignIn() {
    return (
        <div className="space-y-5">
            <img src={Grass} alt="Grass" />
            <div>
                <p>Bienvenue!</p>
                <p>Veuillez vous connecter à votre compte</p>
            </div>

            <form>
                <div></div>
                <input type="email" />
                <input type="password" />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}
