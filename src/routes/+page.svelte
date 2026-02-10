<script lang="ts">
	import { BookOpen, ScrollText, Sparkles, LibraryBig } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Valiwis Library</title>
</svelte:head>

<main class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center md:px-6">
	
	<p class="mb-4 text-sm tracking-[0.3em] text-pink/40 md:text-lg">˚ ✧ ₊ ♡ ₊ ✧ ˚</p>

	<h1
		class="text-3xl font-bold italic tracking-wide text-pink md:text-6xl"
	>
		Valiwis Library
	</h1>

	<p class="mt-3 max-w-md text-sm italic text-subtext0 md:mt-4 md:text-lg">
		My cozy collection of books, manhuas, and manhwas. A personal haven for all my favorite reads.
	</p>

	
	<div class="mt-8 flex items-center gap-3 text-overlay0">
		<span class="h-px w-12 bg-surface1"></span>
		<span class="text-xs tracking-widest text-pink/50">browse</span>
		<span class="h-px w-12 bg-surface1"></span>
	</div>

	<div class="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-4">
		<a
			href="/books"
			class="group rounded-2xl border border-pink/10 bg-mantle/60 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-pink/30 hover:bg-surface0/40 hover:shadow-lg hover:shadow-pink/5"
		>
			<div class="flex justify-center text-pink transition-transform duration-300 group-hover:scale-110">
				<BookOpen size={28} />
			</div>
			<p class="mt-2 font-medium italic text-text">Books</p>
			<p class="mt-1 text-xs text-subtext0">novels & reads</p>
		</a>

		<a
			href="/manhuas"
			class="group rounded-2xl border border-pink/10 bg-mantle/60 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-flamingo/30 hover:bg-surface0/40 hover:shadow-lg hover:shadow-flamingo/5"
		>
			<div class="flex justify-center text-flamingo transition-transform duration-300 group-hover:scale-110">
				<ScrollText size={28} />
			</div>
			<p class="mt-2 font-medium italic text-text">Manhuas</p>
			<p class="mt-1 text-xs text-subtext0">chinese comics</p>
		</a>

		<a
			href="/manhwas"
			class="group rounded-2xl border border-pink/10 bg-mantle/60 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-mauve/30 hover:bg-surface0/40 hover:shadow-lg hover:shadow-mauve/5"
		>
			<div class="flex justify-center text-mauve transition-transform duration-300 group-hover:scale-110">
				<Sparkles size={28} />
			</div>
			<p class="mt-2 font-medium italic text-text">Manhwas</p>
			<p class="mt-1 text-xs text-subtext0">korean comics</p>
		</a>

		<a
			href="/library"
			class="group rounded-2xl border border-pink/10 bg-mantle/60 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-teal/30 hover:bg-surface0/40 hover:shadow-lg hover:shadow-teal/5"
		>
			<div class="flex justify-center text-teal transition-transform duration-300 group-hover:scale-110">
				<LibraryBig size={28} />
			</div>
			<p class="mt-2 font-medium italic text-text">Library</p>
			<p class="mt-1 text-xs text-subtext0">full collection</p>
		</a>
	</div>

	<p class="mt-12 text-xs tracking-[0.2em] text-overlay0/40">made with ♡</p>
</main>
