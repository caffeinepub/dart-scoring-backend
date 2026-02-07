import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Trophy, Code2, Database, Zap } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Target className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Dart Scoring Backend</h1>
                            <p className="text-xs text-muted-foreground">Powered by Internet Computer</p>
                        </div>
                    </div>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <SiGithub className="w-5 h-5" />
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <Badge variant="outline" className="mb-2">
                                Motoko Canister Backend
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Professional Dart Scoring API
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                A robust, decentralized backend service for managing dart games, players, and scoring
                                events. Built on the Internet Computer with Motoko for reliable, persistent data
                                storage.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h3 className="text-2xl font-bold text-center mb-12">Core Capabilities</h3>
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            <Card>
                                <CardHeader>
                                    <Users className="w-8 h-8 text-primary mb-2" />
                                    <CardTitle>Player Management</CardTitle>
                                    <CardDescription>
                                        Create and track players with unique IDs and persistent profiles
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Trophy className="w-8 h-8 text-primary mb-2" />
                                    <CardTitle>Game Creation</CardTitle>
                                    <CardDescription>
                                        Initialize games with configurable rules (301/501, double-out, max darts)
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Target className="w-8 h-8 text-primary mb-2" />
                                    <CardTitle>Score Recording</CardTitle>
                                    <CardDescription>
                                        Record throws with validation, automatic bust detection, and turn management
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* API Methods */}
                <section className="py-16 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <Code2 className="w-12 h-12 text-primary mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Backend Interface</h3>
                                <p className="text-muted-foreground">
                                    Interact with the canister using these Candid methods
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-chart-1" />
                                            Update Methods
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">createPlayer</span>
                                            <span className="text-muted-foreground">(name: Text)</span>
                                        </div>
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">createGame</span>
                                            <span className="text-muted-foreground">(playerIds: [Id])</span>
                                        </div>
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">recordThrow</span>
                                            <span className="text-muted-foreground">(gameId, value, multiplier)</span>
                                        </div>
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">recordTurn</span>
                                            <span className="text-muted-foreground">(gameId, throws)</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Database className="w-4 h-4 text-chart-2" />
                                            Query Methods
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">getAllPlayers</span>
                                            <span className="text-muted-foreground">()</span>
                                        </div>
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">getAllGames</span>
                                            <span className="text-muted-foreground">()</span>
                                        </div>
                                        <div className="font-mono text-sm bg-muted/50 p-3 rounded">
                                            <span className="text-primary">getGameState</span>
                                            <span className="text-muted-foreground">(gameId: Id)</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold mb-8 text-center">How to Use</h3>
                            <Card>
                                <CardContent className="pt-6">
                                    <ol className="space-y-6">
                                        <li className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Create Players</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Use <code className="bg-muted px-1.5 py-0.5 rounded">createPlayer</code> to
                                                    register each participant. Each player receives a unique ID for tracking.
                                                </p>
                                            </div>
                                        </li>
                                        <Separator />
                                        <li className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Initialize a Game</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Call <code className="bg-muted px-1.5 py-0.5 rounded">createGame</code> with
                                                    an array of player IDs. The game starts with a default 501 scoring format.
                                                </p>
                                            </div>
                                        </li>
                                        <Separator />
                                        <li className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                3
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Record Scoring Events</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Use <code className="bg-muted px-1.5 py-0.5 rounded">recordThrow</code> to
                                                    log individual darts (segment 1-20 or 25 for bull, multiplier 1-3) or{' '}
                                                    <code className="bg-muted px-1.5 py-0.5 rounded">recordTurn</code> to submit
                                                    a complete turn of 3 throws.
                                                </p>
                                            </div>
                                        </li>
                                        <Separator />
                                        <li className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                4
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Query Game State</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Retrieve current scores, remaining points, and game status using{' '}
                                                    <code className="bg-muted px-1.5 py-0.5 rounded">getGameState</code>. All
                                                    data persists across canister upgrades.
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Technical Details */}
                <section className="py-16 bg-accent/5">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold mb-8 text-center">Technical Details</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Data Persistence</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        All game data is stored in stable variables within the Motoko canister, ensuring
                                        persistence across upgrades without external databases.
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Validation & Safety</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Input validation ensures only legal dart values (1-20, 25) and multipliers (1-3) are
                                        accepted. Invalid operations trap with clear error messages.
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Scoring Logic</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Automatic score computation with bust detection. When a player busts, their score
                                        reverts for that turn and play continues.
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Unique IDs</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">
                                        Deterministic ID generation using incrementing counters ensures every player and game
                                        has a unique, stable identifier.
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-card/50 py-8 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © 2026. Built with <span className="text-destructive">♥</span> using{' '}
                            <a
                                href="https://caffeine.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                                caffeine.ai
                            </a>
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">
                                Motoko
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                                Internet Computer
                            </Badge>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
