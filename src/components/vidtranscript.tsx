import type { FC } from "react";
import { Card, Button } from "flowbite-react/lib/esm/components";
import { HiPlay, HiPause, HiRewind, HiArrowsExpand } from "react-icons/hi";


const Vidtranscript: FC = function () {

    return (
        <div className="p-5">
            <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Video transcription
                </h5>
                <Button.Group>
                    <Button color="gray">
                        <HiPlay className="mr-2 h-4 w-4" />
                        {' '} <h5 className="text-sm tracking-tight text-gray-900 dark:text-white mr-2">Play</h5>
                    </Button>
                    <Button color="gray">
                        <HiPause className="mr-2 h-4 w-4" />
                        {' '}<h5 className="text-sm tracking-tight text-gray-900 dark:text-white">Pause</h5>
                    </Button>
                    <Button color="gray">
                        <HiRewind className="mr-2 h-5 w-4" />
                        {' '}<h5 className="text-sm tracking-tight text-gray-900 dark:text-white">Rewind</h5>
                    </Button>
                    <Button color="gray">
                        <HiArrowsExpand className="mr-2 h-5 w-4" />
                        {' '}<h5 className="text-sm tracking-tight text-gray-900 dark:text-white">Fullscreen</h5>
                    </Button>
                </Button.Group>
            </Card>
        </div>
    );
}

export default Vidtranscript;