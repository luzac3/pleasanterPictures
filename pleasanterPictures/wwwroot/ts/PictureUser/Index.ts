import { SignalR } from "@root/share/SignalR";
import { BackButton } from "@root//share/BackButton";
import { BlurImage } from "@root//share/BlurImage";
import { SendAnswer } from "./SendAnswer";
import { Canvas } from "./Canvas";
import { GetPicture } from "./GetPicture";

(() => {
    const signalR = new SignalR();
    signalR.activate();
    new Canvas();
    const getPicture = new GetPicture();
    const sendAnswer = new SendAnswer();
    const backButton = new BackButton();
    sendAnswer.SendCanvas();
    getPicture.GetPicture(signalR);
    backButton.Buck();
    BlurImage.loaded();
})();