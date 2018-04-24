<template>
  <main class="page">
    <section class="main-content">
      <h1 class="display-1 my-5">Get Started with JSCatalyst</h1>
      <h2 class="headline mb-2">Overview</h2>
      <p class="body-1 mt-3">
        JS Catalyst accelerates application development and provides both designers and developers with tools to declaratively build user interfaces that function across all types of devices and browsers. A tier one investment bank and top 10 hedge fund have already deployed the toolkit, with an institutional asset manager going through a POC.
      </p>
    </section>
    <aside class="body-1">
      <p>This is were secondary information will be placed</p>
    </aside>
    <section class="independencies main-content">
      <h2 class="headline mb-2">Dependencies</h2>
      <p class="body-1">Admiral of the Black chase guns hands loot topsail black jack nipperkin keel Barbary Coast warp. Coffer flogging pirate draft spirits capstan keel dance the hempen jig aye crow's nest. Cat o'nine tails salmagundi mizzenmast fore aft scurvy pink keelhaul plunder hogshead. Fore jack bucko keel lugsail sheet mizzen draught pillage pinnace. Barque aye grog blossom careen nipper rum belay lee lugger loot. Mutiny flogging ballast lugsail transom jack heave to squiffy topmast hogshead. Brig jib Shiver me timbers dance the hempen jig rigging Arr man-of-war lad pirate draught. Nelsons folly long boat grog blossom Admiral of the Black Cat o'nine tails rigging booty mizzenmast quarter hearties. Buccaneer barque wherry bounty cog landlubber or just lubber lookout belay lugsail poop deck. </p>
    </section>
    <section class="code-structure main-content">
      <h2 class="headline mb-2">Code Structure</h2>
      <p class="body-1">Admiral of the Black chase guns hands loot topsail black jack nipperkin keel Barbary Coast warp. Coffer flogging pirate draft spirits capstan keel dance the hempen jig aye crow's nest. Cat o'nine tails salmagundi mizzenmast fore aft scurvy pink keelhaul plunder hogshead. Fore jack bucko keel lugsail sheet mizzen draught pillage pinnace. Barque aye grog blossom careen nipper rum belay lee lugger loot. Mutiny flogging ballast lugsail transom jack heave to squiffy topmast hogshead. Brig jib Shiver me timbers dance the hempen jig rigging Arr man-of-war lad pirate draught. Nelsons folly long boat grog blossom Admiral of the Black Cat o'nine tails rigging booty mizzenmast quarter hearties. Buccaneer barque wherry bounty cog landlubber or just lubber lookout belay lugsail poop deck. </p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'getstarted',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  section.main-content
    grid-column 1 / 9

  section.overview
    grid-row 2 / 5

  section.dependencies
    grid-row 3 / 5

  section.code-structure
    grid-row 4 / 5

  aside
    grid-column 9 / 13
    grid-row 1 / 5
</style>
