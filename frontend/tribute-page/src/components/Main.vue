<template>
    <main class="container">
        <p>
            Sony's PlayStation consoles are a vital part of console gaming. They are
            some of the most successful video game consoles ever released. Ever since the
            first PlayStation, the consoles continue to have some of the best exclusive
            video games known to date, like the Crash Bandicoot, God of War, and Uncharted
            series, among many more. Some amazing PlayStation exclusives also include The
            Last of Us, Okami, and Shadow of the Colossus. I should probably mention the
            Ratchet &amp; Clank series too, which has spanned three console generations
            so far with its recent release of Ratchet &amp; Clank on PS4 (a re-imagining
            of the original game).
        </p>
        <section>
            <h2>Consoles released so far:</h2>
            <ul>
                <li v-for="console in consoles">
                    {{ console["name"] }}, {{ console["release-year"] }}
                </li>
            </ul>
        </section>
        <div class="links center-text">
            <a class="btn btn--default" href="https://en.wikipedia.org/wiki/PlayStation_(console)" target="_blank">Further info on Wikipedia</a>
            <a class="btn btn--default" href="https://www.playstation.com/" target="_blank">Official PlayStation website</a>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            consoles: [
                {
                    "name": "PlayStation",
                    "release-year": "1994",
                },
                {
                    "name": "PSOne",
                    "release-year": "2000",
                },
                {
                    "name": "PlayStation 2",
                    "release-year": "2000",
                },
                {
                    "name": "PlayStation 2 Slimline",
                    "release-year": "2004",
                },
                {
                    "name": "PlayStation Portable",
                    "release-year": "2004",
                },
                {
                    "name": "PlayStation 3",
                    "release-year": "2006",
                },
                {
                    "name": "PlayStation 3 Slim",
                    "release-year": "2009",
                },
                {
                    "name": "PlayStation Vita",
                    "release-year": "2011",
                },
                {
                    "name": "PlayStation 3 Super Slim",
                    "release-year": "2012",
                },
                {
                    "name": "PlayStation 4",
                    "release-year": "2013",
                },
                {
                    "name": "PlayStation 4 Slim",
                    "release-year": "2016",
                },
                {
                    "name": "PlayStation 4 Pro",
                    "release-year": "2016",
                }
            ]
        };
    }
};
</script>
