'use client';
import { useEffect, useMemo } from "react";

const SelectIndexCertificate = ({ service, prevService, selectedIndex, setSelectedIndex, mode }) => {
    const availableItems = service.certificates;

    // Calculate the maximum index
    const maxIndex = useMemo(() => (
        availableItems.length > 0
            ? Math.max(...availableItems.map((item) => item.index))
            : 0
    ), [availableItems]);

    const nextIndex = maxIndex + 1;

    // Determine if the next index should be shown based on mode
    const showNextIndex = mode === 'upload' || service._id !== prevService;

    useEffect(() => {
        // Automatically select the maximum index in upload mode
        // If service_id does not match prevService, select nextIndex
        if (mode === 'upload') {
            setSelectedIndex(nextIndex);
        } else if (service._id !== prevService) {
            setSelectedIndex(nextIndex);
        }
    }, [service, prevService, maxIndex, availableItems, setSelectedIndex, nextIndex, mode]);

    const handleChange = (e) => {
        setSelectedIndex(Number(e.target.value));
    };

    return (
        <div className="w-full">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Select Index for Certificate
            </label>
            <select
                id="service"
                name="service"
                value={selectedIndex || ""}
                onChange={handleChange}
                className="w-full px-4 h-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {/* If there are no available items, show only the nextIndex option */}
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
                        {/* Conditionally render the nextIndex option only in upload mode */}
                        {showNextIndex && (
                            <option value={nextIndex} className="bg-blue-100 font-bold">
                                {nextIndex} (New Index)
                            </option>
                        )}
                    </>
                )}
            </select>
            <p>Selected index : {selectedIndex}</p>
        </div>
    );
};

export default SelectIndexCertificate;
