
export default function Sidebar() {
    return (
        <div className="flex flex-col w-64 h-screen bg-gray-800">
            <div className="flex items-center justify-center h-16 border-b border-gray-900">
                <h1 className="text-white text-2xl">Data Analytics</h1>
            </div>
            <div className="p-4">
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="block text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block text-white">Reports</a>
                    </li>
                    <li>
                        <a href="#" className="block text-white">Esasy Data Transfer</a>
                    </li>
                    <li>
                        <a href="#" className="block text-white">Settings</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}