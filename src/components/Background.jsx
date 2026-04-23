import React from "react"

const AnimatedBackground = () => {
	return (
		<div className="fixed inset-0 pointer-events-none z-[-1]">
			{/* Clean Light Theme Grid Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
			{/* Subtle radial gradient overlay to soften edges */}
			<div 
				className="absolute inset-0"
				style={{
					background: "radial-gradient(circle at center, transparent 0%, var(--bg-color) 100%)"
				}}
			></div>
		</div>
	)
}

export default AnimatedBackground
