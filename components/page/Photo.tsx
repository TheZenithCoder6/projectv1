'use client';

import Image from 'next/image';

const Accordian = () => {
    const animation = (e: React.MouseEvent<HTMLDivElement>) => {
        const items = document.querySelectorAll('.item');
        const reset = () =>
            items.forEach((item) => item.classList.remove('animation'));

        const target = e.currentTarget as HTMLElement; // CurrentTarget use karna better hai
        
        reset();
        target.classList.add('animation');
    };

    // Images Array (Code saaf rakhne ke liye)
    const images = [
        "https://www.aakritiartgallery.com/uploads/2024/09/21/a6d9eb216f6be043dbc24f6a7f4f645f.jpg",
        "https://www.aakritiartgallery.com/uploads/2024/09/21/a6d9eb216f6be043dbc24f6a7f4f645f.jpg",
        "https://www.aakritiartgallery.com/uploads/2024/09/21/a6d9eb216f6be043dbc24f6a7f4f645f.jpg",
        "https://www.aakritiartgallery.com/uploads/2024/09/21/a6d9eb216f6be043dbc24f6a7f4f645f.jpg",
        "https://www.aakritiartgallery.com/uploads/2024/09/21/a6d9eb216f6be043dbc24f6a7f4f645f.jpg",
        "https://www.aakritiartgallery.com/uploads/2024/09/21/a6d9eb216f6be043dbc24f6a7f4f645f.jpg"
    ];

    return (
        <div className="w-full px-4 ">
            <div className="min-h-[70vh] flex items-center justify-center ">
                {/* Mobile: flex-col | Desktop: flex-row */}
                <div className="flex flex-col md:flex-row gap-[0.7] w-full max-w-8xl h-[600px] md:h-[500px] mt-4 md:mt-24 ">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            onClick={animation}
                            className="item flex-1 h-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out"
                        >
                            <Image
                                src={src}
                                alt={`Accordian${index}`}
                                width={800}
                                height={800}
                                className="w-full h-full object-cover rounded-sm"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* In-page CSS for the expand effect */}
            <style jsx>{`
                .item.animation {
                    flex: 5;
                }
                @media (max-width: 768px) {
                    .item.animation {
                        flex: 3; /* Mobile par thoda kam expand */
                    }
                }
            `}</style>
        </div>
    );
};

export default Accordian;