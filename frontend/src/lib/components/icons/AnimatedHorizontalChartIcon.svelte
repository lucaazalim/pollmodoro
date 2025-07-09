<svg
	xmlns="http://www.w3.org/2000/svg"
	width="150"
	height="150"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="lucide lucide-chart-bar-icon lucide-chart-bar"
>
	<!-- Axes -->
	<path d="M3 3v16a2 2 0 0 0 2 2h16" />

	<!-- Bar 1 -->
	<path id="bar1" d="M7 16h8">
		<animate
			attributeName="d"
			values="M7 16h2; M7 16h8; M7 16h4; M7 16h8; M7 16h2"
			dur="3s"
			repeatCount="indefinite"
		/>
	</path>

	<!-- Bar 2 -->
	<path id="bar2" d="M7 11h12">
		<animate
			attributeName="d"
			values="M7 11h4; M7 11h12; M7 11h6; M7 11h12; M7 11h4"
			dur="3s"
			repeatCount="indefinite"
			begin="0.3s"
		/>
	</path>

	<!-- Bar 3 -->
	<path id="bar3" d="M7 6h3">
		<animate
			attributeName="d"
			values="M7 6h1; M7 6h3; M7 6h5; M7 6h3; M7 6h1"
			dur="3s"
			repeatCount="indefinite"
			begin="0.6s"
		/>
	</path>
</svg>
