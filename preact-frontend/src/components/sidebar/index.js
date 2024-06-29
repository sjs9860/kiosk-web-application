import { h } from 'preact';
import { Link } from 'preact-router/match';

const Sidebar = () => (
	// <div class="">
	// 	<a href="/" class="">
	// 		<img src="../../assets/preact-logo-inverse.svg" alt="Preact Logo" height="32" width="32" />
	// 		<h1>Preact CLI</h1>
	// 	</a>
	// 	<nav>
	// 		<Link href="/">
	// 			Home
	// 		</Link>
	// 		<Link href="/profile">
	// 			Me
	// 		</Link>
	// 		<Link href="/profile/john">
	// 			John
	// 		</Link>
	// 	</nav>
	// </div>
  <div class=" min-h-0 flex overflow-hidden">
    <nav aria-label="Sidebar" class="hidden lg:block flex-shrink-0 bg-gray-800 overflow-y-auto">
      <div class="relative w-20 flex space-y-16 flex-col p-3">

        <a href="/" class="text-gray-400 hover:text-red-700">
          <div class="flex-shrink-0 inline-flex items-center justify-center w-14">
            <i class="fa fa-house"></i>
          </div>
          <div class="text-center text-xs font-normal ">Home</div>
        </a>

        <a href="/profile" class="text-gray-400 hover:text-red-700">
          <div class="flex-shrink-0 inline-flex items-center justify-center w-14">
            <i class="fa fa-cog"></i>
          </div>
          <div class="text-center text-xs font-normal ">Settings</div>
        </a>

        <a href="/profile/john" class="text-gray-400 hover:text-red-700">
          <div class="flex-shrink-0 inline-flex items-center justify-center w-14">
            <i class="fa fa-envelope"></i>
          </div>
          <div class="text-center text-xs font-normal ">Messages</div>
        </a>

      </div>
    </nav>
  </div>
);

export default Sidebar;
