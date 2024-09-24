'use client';

const SelectIndexUploadService = ({ availableItems, setSelectedIndex }) => {

    const maxIndex = Math.max(...availableItems.map((item) => item.index))
    const nextIndex = maxIndex + 1;

    const handleChange = (e) => {
        setSelectedIndex(e.target.value);
    };

    return (
        <div className="w-full">
            <select
                id="service"
                name="service"
                value={nextIndex}
                onChange={handleChange}
                className="w-full px-4 h-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {availableItems.length === 0 ? (
                    <option value={nextIndex} className="bg-blue-100 font-bold">
                        {nextIndex} (New Index)
                    </option>
                ) : (
                    <>
                        <option value="">Choose an index</option>
                        {availableItems.map((item) => (
                            <option key={item._id} value={item.index}>
                                {item.index}. {item.title}
                            </option>
                        ))}
                        <option value={nextIndex} className="bg-blue-100 font-bold">
                            {nextIndex} (New Index)
                        </option>
                    </>
                )}
            </select>
        </div>
    );
};

export default SelectIndexUploadService;

