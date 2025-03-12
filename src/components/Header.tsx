import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
	{ name: 'Metal Casting', href: '/metal-casting' },
	{ name: 'Metal Fabrication', href: '/metal-fabrication' },
	{ name: 'Ground Screws', href: '/ground-screws' },
	{ name: 'Quartz Stone', href: '/quartz-stone' },
	{ name: 'Rubber', href: '/rubber' },
	{ name: 'Plywood', href: '/plywood' },
	{ name: 'About Us', href: '/about-us' },
	// { name: "Media", href: "/media" },
	{ name: 'Contact Us', href: '/contact-us' }
]

const mobilenavigation: {
	heading: string
	submenu: {
		title: string
		link: string
		icon: string
		button?: { btn: string; link: string }[]
	}[]
}[] = [
	{
		heading: 'Products',
		submenu: [
			{
				title: 'Metal Casting',
				link: '/metal-casting',
				icon: ''
			},
			{
				title: 'Metal Fabrication',
				link: '/metal-fabrication',
				icon: ''
			},
			{
				title: 'Ground Screws',
				link: '/ground-screws',
				icon: ''
			},
			{
				title: 'Quartz stone',
				link: '/quartz-stone',
				icon: ''
			},
			{
				title: 'Rubber',
				link: '/rubber',
				icon: ''
			},
			{
				title: 'Plywood',
				link: '/plywood',
				icon: ''
			}
		]
	},
	{
		heading: 'Company',
		submenu: [
			{
				title: 'About Us',
				link: '/about-us',
				icon: ''
			},
			// {
			//   title: "Media",
			//   link: "/media",
			//   icon: "",
			// },
			{
				title: 'Contact Us',
				link: '/contact-us',
				icon: ''
			}
		]
	}
]

// Định nghĩa CSS keyframes animation cho viền chạy với blur effect
const redBorderKeyframes = ``;

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [useLightLogo, setUseLightLogo] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef<HTMLElement>(null)
	const [hoverIndex, setHoverIndex] = useState<number | null>(null)
	const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
	const [hoverStyles, setHoverStyles] = useState({ left: 0, width: 0 })
	const [screenSize, setScreenSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0
	})

	// Initialize refs array
	useEffect(() => {
		menuItemsRef.current = menuItemsRef.current.slice(0, navigation.length)
	}, [])

	// Theo dõi kích thước màn hình
	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight
			})
		}

		// Set up initial size
		handleResize()

		// Set up event listener
		window.addEventListener('resize', handleResize)
		
		// Clean up
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Update hover div position and size when hoverIndex changes
	useEffect(() => {
		if (hoverIndex !== null && menuItemsRef.current[hoverIndex]) {
			const currentItem = menuItemsRef.current[hoverIndex]
			if (currentItem) {
				const rect = currentItem.getBoundingClientRect()
				const parentRect = currentItem.parentElement?.getBoundingClientRect() || { left: 0 }
				
				// Tính toán padding dựa vào kích thước màn hình
				let padding = 24; // default (12px mỗi bên)
				
				if (screenSize.width < 1024) { // lg breakpoint
					padding = 0; // Không có padding cho màn hình nhỏ hơn
				} else if (screenSize.width < 1280) { // xl breakpoint
					padding = 16; // 8px mỗi bên cho màn hình trung bình
				}
				
				// Calculate position relative to parent with responsive padding
				setHoverStyles({
					left: rect.left - parentRect.left - (padding / 2),
					width: rect.width + padding
				})
			}
		}
	}, [hoverIndex, screenSize.width])

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY
			setIsScrolled(scrollPosition > 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const checkBackground = () => {
			if (!headerRef.current) return

			const header = headerRef.current
			const headerRect = header.getBoundingClientRect()
			const elementAtPoint = document.elementFromPoint(
				headerRect.left + headerRect.width / 2,
				headerRect.top + headerRect.height / 2
			)

			if (elementAtPoint) {
				// Kiểm tra element và các parent của nó
				let currentElement: Element | null = elementAtPoint
				while (currentElement) {
					// Kiểm tra các class hoặc id liên quan đến hero, banner, hoặc section có background
					const hasBackgroundSection = 
						currentElement.classList.contains('hero') ||
						currentElement.classList.contains('banner') ||
						currentElement.classList.contains('bg-section') ||
						currentElement.classList.contains('has-background') ||
						currentElement.id.includes('hero') ||
						currentElement.id.includes('banner') ||
						// Kiểm tra inline style background-image
						currentElement.hasAttribute('style') &&
						currentElement.getAttribute('style')?.includes('background-image')
					
					if (hasBackgroundSection) {
						setUseLightLogo(true)
						return
					}
					currentElement = currentElement.parentElement
				}
				setUseLightLogo(false)
			}
		}

		// Chạy kiểm tra mỗi 100ms để đảm bảo bắt được thay đổi
		const interval = setInterval(checkBackground, 100)

		// Chạy kiểm tra khi scroll
		window.addEventListener('scroll', checkBackground)

		// Chạy kiểm tra ngay lập tức
		checkBackground()

		return () => {
			clearInterval(interval)
			window.removeEventListener('scroll', checkBackground)
		}
	}, [])

	return (
		<>
			<style>{redBorderKeyframes}</style>
			<header 
				ref={headerRef} 
				className={`fixed top-0 left-0 right-0 isolate z-[100] w-full transition-all duration-300
					${isScrolled 
						? 'bg-white border-b border-gray-200 shadow-md' 
						: 'bg-transparent'
					}`}
			>
				<nav
					aria-label="Global"
					className="mx-auto flex container items-center justify-between p-4 lg:px-8"
				>
					<div className="flex w-1/4">
						<a href="/" className="-m-1.5">
							<span className="sr-only">SoLarMax</span>
							<img 
								alt="" 
								src={isScrolled ? "/images/logo-solomon.png" : "/images/logo-solomon-white.png"}
								className="h-8 w-auto sm:h-10 md:h-12 object-contain object-left transition-all duration-300" 
							/>
						</a>
					</div>

					<div className="flex items-center space-x-6 md:order-2">
						{/* <a
							href="https://slmglobal.trustpass.alibaba.com/"
							className="text-gray-900 hover:text-gray-400"
							target="_blank"
						>
							<span className="sr-only">Alibaba</span>
							<div className="flex h-8 w-8 items-center">
								<img className="" src="/images/alibaba-svgrepo-com.svg" />
								<span className="text-nowrap font-bold">Find us on Alibaba</span>
							</div>
						</a> */}
					</div>

					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 bg-white/70 backdrop-blur-sm backdrop-filter border border-white/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
						>
							<span className="sr-only">Open main menu</span>
							<Bars2Icon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>

					<PopoverGroup 
						className={`hidden w-3/4 lg:flex lg:gap-x-1 xl:gap-x-2 2xl:gap-x-4 lg:justify-evenly lg:px-2 xl:px-4 lg:py-2 transition-all duration-300 relative
							${isScrolled 
								? 'lg:bg-red-600 lg:rounded-full' 
								: 'lg:bg-white/20 lg:backdrop-blur-lg lg:backdrop-filter lg:rounded-full lg:border lg:border-white/10'
							}`}
						style={{
							boxShadow: isScrolled 
								? 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.3), inset 0 1px 2px 0 rgba(0, 0, 0, 0.2)' 
								: 'inset 0 3px 8px 0 rgba(0, 0, 0, 0.25), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
							position: 'relative',
							overflow: 'hidden'
						}}
					>
						{/* Đã bỏ tất cả hiệu ứng chuyển động */}

						{/* Sliding background div - now uses exact positions with responsive padding */}
						{hoverIndex !== null && (
							<div 
								className="absolute rounded-full bg-white transition-all duration-300"
								style={{
									left: `${hoverStyles.left}px`,
									width: `${hoverStyles.width}px`,
									top: '4px',
									bottom: '4px',
									zIndex: 5,
									boxShadow: '0 0 10px 3px rgba(255, 255, 255, 0.3), 0 2px 10px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 0 3px rgba(255, 255, 255, 0.5)'
								}}
							/>
						)}
						
						{navigation.map((item, index) => (
							<a
								key={item.name}
								ref={el => menuItemsRef.current[index] = el}
								href={item.href}
								className={`lg:text-sm xl:text-base font-bold leading-6 whitespace-nowrap transition-all duration-300 lg:px-1 xl:px-2 2xl:px-3 py-2 hover:scale-110 hover:font-extrabold relative group flex-1 text-center rounded-full z-10 text-white hover:text-red-600
									${hoverIndex === index ? 'text-red-600 scale-110 font-extrabold' : ''}`}
								style={{
									textShadow: hoverIndex === index ? 'none' : isScrolled 
										? '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 0, 0, 0.3)' 
										: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.6)'
								}}
								onMouseEnter={() => setHoverIndex(index)}
								onMouseLeave={() => setHoverIndex(null)}
							>
								{item.name}
							</a>
						))}
					</PopoverGroup>

					<div className="hidden lg:flex lg:justify-end">
						{/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
							Login <span aria-hidden="true">&rarr;</span>
						</a> */}
					</div>
				</nav>
				<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
					<div className="fixed inset-0 z-[110]" />
					<DialogPanel 
						className={`fixed inset-y-0 right-0 z-[120] w-full overflow-y-auto p-3 sm:max-w-sm sm:rounded-l-2xl transition-all duration-300 ease-in-out bg-white sm:border-l sm:border-y sm:border-gray-200 sm:shadow-xl`}
					>
						<div className="flex items-center justify-between">
							<a href="/" className="-m-1.5 p-1.5">
								<span className="sr-only">SoLarMax</span>
								<img alt="" src="/images/logo-solomon.png" className="h-8 w-auto sm:h-10 object-contain object-center" />
							</a>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="rounded-full p-2.5 text-gray-700 bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-200 transition-all duration-200"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="h-6 w-6" />
							</button>
						</div>

						<div className="mb-24 mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									<div className="-mx-3">
										{mobilenavigation.map((item, index) => (
											<div
												key={index}
												className="w-full py-2 pl-3 pr-3.5 text-xl font-semibold leading-7 text-gray-900"
											>
												{item.heading}
												<div
													className="mt-2 divide-y divide-gray-200 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
													id="disclosure-1"
												>
													{item.submenu.map((submenuItem, subIndex) => (
														<a
															key={subIndex}
															href={submenuItem.link}
															className="block py-2 pl-3 text-base font-semibold leading-7 text-gray-900 hover:bg-white/80 first:rounded-t-xl last:rounded-b-xl transition-all duration-200"
														>
															<button
																type="button"
																className="flex w-full items-center justify-between pr-3.5 text-base font-bold leading-7 text-gray-900 hover:bg-white/80 hover:text-red-600 transition-all duration-200"
															>
																<div className="flex items-center">
																	<img alt="" src={submenuItem.icon} className="h-8 w-auto pr-2" />
																	<p className="text-nowrap font-bold relative">{submenuItem.title}</p>
																</div>
																<div className="flex gap-2">
																	{submenuItem.button
																		?.filter((btnItem) => btnItem) // Filter out undefined or null button items
																		.map((btnItem, btnIndex) => (
																			<a
																				key={btnIndex}
																				href={btnItem.link}
																				className="rounded-full border border-slate-800 px-3 py-1 text-sm"
																			>
																				{btnItem.btn}
																			</a>
																		))}
																</div>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth={1.5}
																	stroke="currentColor"
																	className="size-5"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="m8.25 4.5 7.5 7.5-7.5 7.5"
																	/>
																</svg>
															</button>
														</a>
													))}
												</div>
											</div>
										))}
										{/* <div style={{margin:"15px 10px 10px 10px", borderRadius:"10px", position: 'relative', paddingBottom: '53.25%', height: 0, overflow: 'hidden', container: '100%', background: '#000' }}>
											<iframe
												width="560"
												height="315"
												src="https://www.youtube.com/embed/7rnvOZWwh5I?feature=oembed&showinfo=0"
												title="YouTube video player"
												frameBorder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												referrerPolicy="strict-origin-when-cross-origin"
												allowFullScreen
												style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
											></iframe>
										</div>                  */}
									</div>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		</>
	)
}
