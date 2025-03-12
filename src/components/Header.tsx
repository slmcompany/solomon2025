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
				link: '/',
				icon: ''
			}
		]
	}
]

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [useLightLogo, setUseLightLogo] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef<HTMLElement>(null)

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
		<header 
			ref={headerRef} 
			className={`fixed top-0 left-0 right-0 isolate z-50 w-full transition-all duration-300
				${isScrolled 
					? 'backdrop-blur-md backdrop-filter bg-white/30 border-b border-white/30 shadow-lg' 
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
							className="h-12 w-auto lg:h-12 transition-all duration-300" 
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
					className={`hidden w-3/4 lg:flex lg:gap-x-4 lg:justify-end lg:px-4 lg:py-2 transition-all duration-300
						${isScrolled 
							? 'lg:bg-transparent' 
							: 'lg:bg-white/50 lg:backdrop-blur-md lg:backdrop-filter lg:rounded-full lg:shadow-md lg:border lg:border-white/40'
						}`}
				>
					{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className={`text-base font-bold leading-6 whitespace-nowrap transition-all duration-300 hover:text-red-600 px-3 py-2 hover:scale-105 relative group hover:bg-white/70 hover:shadow-md rounded-full
								${isScrolled ? 'text-gray-800' : 'text-gray-900'}`}
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
				<div className="fixed inset-0 z-10" />
				<DialogPanel 
					className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto p-3 sm:max-w-sm sm:rounded-l-2xl transition-all duration-300 ease-in-out
						${isScrolled 
							? 'bg-white/50 backdrop-blur-lg backdrop-filter sm:border-l sm:border-y sm:border-white/30 sm:shadow-xl' 
							: 'bg-black/40 backdrop-blur-sm backdrop-filter'
						}`}
				>
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">SoLarMax</span>
							<img alt="" src="/images/logo-solomon.png" className="h-12 w-auto" />
						</a>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className={`-m-2.5 rounded-full p-2.5 transition-all duration-200
								${isScrolled 
									? 'text-gray-700 bg-white/70 backdrop-blur-sm backdrop-filter border border-white/50 shadow-sm hover:shadow-md hover:scale-105' 
									: 'text-white bg-white/10 hover:bg-white/20'
								}`}
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
											className={`w-full py-2 pl-3 pr-3.5 text-xl font-semibold leading-7
												${isScrolled ? 'text-gray-900' : 'text-white'}`}
										>
											{item.heading}
											<div
												className="mt-2 divide-y divide-gray-100/30 rounded-xl bg-white/60 backdrop-blur-sm backdrop-filter shadow-md border border-white/50 hover:shadow-lg transition-shadow duration-300"
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
	)
}
