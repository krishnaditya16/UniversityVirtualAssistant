import { useEffect, useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";
import type { FC } from "react";
import { Card, Button, Badge, Label, TextInput, Textarea, Tooltip } from "flowbite-react/lib/esm/components";
import { HiMicrophone, HiStop, HiRefresh, HiFlag } from "react-icons/hi";

// Reference: https://www.loginradius.com/blog/async/quick-look-at-react-speech-recognition/

const Dictaphone: FC = function () {
    const [message, messageSet] = useState("");
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition({
        commands: [
            {
                command: "reset",
                callback: () => resetTranscript()
            },
            {
                command: "shut up",
                callback: () => messageSet("I wasn't talking.")
            },
            {
                command: "Hello",
                callback: () => messageSet("Hi there!")
            }
        ]
    });

    useEffect(() => {
        if (finalTranscript !== "") {
            console.log("Got final result:", finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log(
            "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
        );
        return null;
    }
    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: "en"
        });
    };
    return (
        <div className="p-5">
            <div>
                <Button.Group className="mb-4 mt-4">
                    <Button color="gray" onClick={listenContinuously}>
                        <HiMicrophone className="mr-3 h-5 w-5" />
                        {' '} <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mr-2">Listen</h5> {listening ? <Badge color="success">On</Badge> : <Badge color="failure">Off</Badge>}
                    </Button>
                    <Button color="gray" onClick={SpeechRecognition.stopListening}>
                        <HiStop className="mr-3 h-5 w-5" />
                        {' '}<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Stop</h5>
                    </Button>
                    <Button color="gray" onClick={resetTranscript}>
                        <HiRefresh className="mr-3 h-5 w-5" />
                        {' '}<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Reset</h5>
                    </Button>
                    {/* <Button color="gray" onClick={resetTranscript}>
                        <HiFlag className="mr-3 h-5 w-5" />
                        {' '}<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">English</h5>
                    </Button> */}
                </Button.Group>
            </div>
            <div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                                <div className="flex items-center space-x-1 sm:pr-4">
                                    <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Attach file</span>
                                    </button>
                                    <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Embed map</span>
                                    </button>
                                    <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Upload image</span>
                                    </button>
                                </div>
                            </div>
                            <button type="button" data-tooltip-target="tooltip-fullscreen" className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Full screen</span>
                            </button>
                            <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Show full screen
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                            <label className="sr-only">Publish post</label>
                            <textarea id="editor" rows={8} value={transcript} readOnly={true} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Your voice transcription will appear here ..." required></textarea>
                        </div>
                    </div>
                {/* <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Transcription
                    </h5>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                                <div className="flex items-center space-x-1 sm:pr-4">
                                    <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Attach file</span>
                                    </button>
                                    <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Embed map</span>
                                    </button>
                                    <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Upload image</span>
                                    </button>
                                </div>
                            </div>
                            <button type="button" data-tooltip-target="tooltip-fullscreen" className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Full screen</span>
                            </button>
                            <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Show full screen
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                            <label className="sr-only">Publish post</label>
                            <textarea id="editor" rows={8} value={transcript} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Your voice transcription will appear here ..." required></textarea>
                        </div>
                    </div>
                </Card> */}
            </div>
        </div>
    );
}

export default Dictaphone;