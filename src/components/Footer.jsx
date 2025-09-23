import React from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';

import routes from './routes';

const Footer = (props) => {

    const content = (
        <div>
            <p>App is currently in development. Please wait</p>
        </div>
    );

    return (
        <div className={`bg-neutral-900 ${props.noSpace ? 'mt-0' : ''} hidden md:block`}>
            {/* Primary footer content hidden on mobile for app-like UI */}
            <div className="bg-neutral-900 hidden md:block">
                <div className="pt-[3%] pb-[2%] px-4">
                    <div className="grid grid-cols-5 gap-6">
                        <div className="col-span-2">
                            <h6 className="text-white font-semibold text-lg mb-1 pt-2.5 tracking-wide">About Konnect</h6>
                            <p className="text-neutral-400 text-sm leading-relaxed w-[95%]">
                                Food? Grocery? Household? Snack, Foodstuffs? We have got it all, if you cannot find what you are looking for, drop us a message and we will add it! Konnect allows you to enjoy instant and monthly cash rewards from product offers and commissions when you refer friends.
                            </p>
                        </div>
                        <div>
                            <h6 className="text-white font-semibold text-lg mb-1 pt-2.5 tracking-wide">Links</h6>
                            <ul className="space-y-1">
                                <li className="list-none pb-1">
                                    <Link to="/contact" className="text-neutral-400 text-sm leading-6 cursor-pointer hover:text-white transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="list-none pb-1">
                                    <Popover content={content} title={null} trigger="click">
                                        <p className="text-neutral-400 text-sm leading-6 cursor-pointer mb-0 hover:text-white transition-colors">
                                            Our Blog
                                        </p>
                                    </Popover>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="text-white font-semibold text-lg mb-1 pt-2.5 tracking-wide">More Info</h6>
                            <ul className="space-y-1">
                                <li className="list-none pb-1">
                                    <Link to={routes.profile_orders} className="text-neutral-400 text-sm leading-6 cursor-pointer hover:text-white transition-colors">
                                        Track your Order
                                    </Link>
                                </li>
                                <li className="list-none pb-1">
                                    <Link to="/profile/loyalty" className="text-neutral-400 text-sm leading-6 cursor-pointer hover:text-white transition-colors">
                                        Your Account
                                    </Link>
                                </li>
                                <li className="list-none pb-1">
                                    <Link to="/terms" className="text-neutral-400 text-sm leading-6 cursor-pointer hover:text-white transition-colors">
                                        Terms
                                    </Link>
                                </li>
                                <li className="list-none pb-1">
                                    <Link to="/privacy" className="text-neutral-400 text-sm leading-6 cursor-pointer hover:text-white transition-colors">
                                        Policies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="text-white font-semibold text-lg mb-2.5 pt-2.5 tracking-wide">Connect with us</h6>
                            <div className="flex space-x-5 mt-4">
                                <a href="https://www.facebook.com/profile.php?id=100090695480136" rel="noreferrer" target="_blank" className="inline-block">
                                    <i className="uil uil-facebook-f text-white py-1.5 px-2.5 border-2 border-white rounded-full bg-transparent hover:bg-white hover:text-neutral-900 transition-colors"></i>
                                </a>
                                <a href="https://www.instagram.com/konnectwise9ja/" rel="noreferrer" target="_blank" className="inline-block">
                                    <i className="uil uil-instagram text-white py-1.5 px-2.5 border-2 border-white rounded-full bg-transparent hover:bg-white hover:text-neutral-900 transition-colors"></i>
                                </a>
                                <a href="https://twitter.com/konnect_ws" rel="noreferrer" target="_blank" className="inline-block">
                                    <i className="uil uil-twitter-alt text-white py-1.5 px-2.5 border-2 border-white rounded-full bg-transparent hover:bg-white hover:text-neutral-900 transition-colors"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom bar (desktop only) */}
            <div className="border-t border-neutral-700">
                <div className="py-3 px-4 text-center">
                    <p className="text-white text-sm mb-0">&bull; All rights reserved &copy; Konnect</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
