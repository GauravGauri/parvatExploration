'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar, Search, Users, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@/components/ui/DatePicker';
import { Loader } from '@/components/ui/Loader';
import api from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();
  const [location, setLocation] = React.useState('');
  const [guests, setGuests] = React.useState('');

  const [upcomingTreks, setUpcomingTreks] = React.useState<any[]>([]);
  const [loadingTreks, setLoadingTreks] = React.useState(true);

  React.useEffect(() => {
    const fetchTreks = async () => {
      try {
        const { data } = await api.get('/treks');
        // Get the first 3 treks for the homepage, map _id to id
        setUpcomingTreks(data.slice(0, 3).map((t: any) => ({ ...t, id: t._id })));
      } catch (error) {
        console.error('Failed to fetch treks', error);
      } finally {
        setLoadingTreks(false);
      }
    };
    fetchTreks();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('search', location);
    if (date) params.append('date', date.toISOString());
    if (guests) params.append('guests', guests);
    
    router.push(`/trips?${params.toString()}`);
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Himalayan Mountain"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading text-white leading-tight mb-6 tracking-tight">
              Explore the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Himalayas</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed">
              Explore the Himalayas with Parvat Exploration – guided treks, winter treks & high-altitude expeditions across India. Safe leaders, small groups, real adventure.
            </p>

            <div className="relative z-20 bg-white p-2 md:p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 md:gap-4 w-full max-w-5xl mx-auto backdrop-blur-sm bg-white/95">
              <div className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <MapPin className="text-rose-500 w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</span>
                  <input 
                    type="text" 
                    placeholder="Where to?" 
                    className="outline-none text-slate-900 font-medium bg-transparent placeholder:text-slate-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <Calendar className="text-rose-500 w-5 h-5 shrink-0" />
                <DatePicker 
                  selected={date} 
                  onSelect={setDate} 
                  placeholder="When?"
                  className="flex-1 min-w-0 w-full"
                />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3">
                <Users className="text-rose-500 w-5 h-5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Guests</span>
                  <input 
                    type="text" 
                    placeholder="How many?" 
                    className="outline-none text-slate-900 font-medium bg-transparent placeholder:text-slate-400"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                size="lg" 
                className="md:w-auto w-full px-8 gap-2 rounded-2xl shadow-lg shadow-rose-500/20 active:scale-95 transition-transform"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">Discover Adventures</h2>
              <p className="text-slate-600">Choose your next big challenge in the mountains.</p>
            </div>
            <Link href="/trips" className="hidden md:flex text-rose-600 font-semibold items-center gap-2 hover:text-rose-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Treks', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { title: 'Expeditions', image: 'https://images.unsplash.com/photo-1522346513757-54c552451fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { title: 'Winter Treks', image: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { title: 'Homestays', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white font-heading">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Treks Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-slate-900 mb-4">Upcoming Treks</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Join our expertly guided treks across the most beautiful trails in the Himalayas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingTreks ? (
              <div className="col-span-full">
                <Loader message="Loading upcoming treks..." />
              </div>
            ) : upcomingTreks.map((trek) => (
              <div key={trek.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img src={trek.image} alt={trek.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {trek.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
                    {trek.diff}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">{trek.title}</h3>
                      <p className="text-sm text-slate-500">{trek.days}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-0.5">From</p>
                      <p className="text-lg font-bold text-rose-600">{trek.price}</p>
                    </div>
                  </div>
                  <Link href={`/trips/${trek.id}`}>
                    <Button variant="outline" className="w-full justify-between group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-colors">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/trips">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Explore All Treks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-slate-900 mb-4">Why Choose Parvat Exploration?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We provide the highest quality trekking experiences with a focus on safety, sustainability, and authentic adventure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">Small Group Sizes</h3>
              <p className="text-slate-600">We keep our groups small to ensure personalized attention and minimize our environmental impact on the trails.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">Expert Guides</h3>
              <p className="text-slate-600">Our trek leaders are certified mountaineers and wilderness first-responders with years of Himalayan experience.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">Premium Routes</h3>
              <p className="text-slate-600">We carefully select and curate the best trails, campsites, and homestays to give you an unforgettable experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-slate-900 mb-4">What Our Trekkers Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our community of adventurers has to say about their experiences.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
              <div className="flex text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" />
              </div>
              <p className="text-slate-700 italic mb-6">"The Kedarkantha trek was perfectly organized! The guides were incredibly supportive and the food at the camps was amazing. Highly recommend Parvat Exploration!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center font-bold text-rose-700">AR</div>
                <div>
                  <h4 className="font-bold text-slate-900">Arjun R.</h4>
                  <p className="text-sm text-slate-500">Kedarkantha Trek</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
              <div className="flex text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" />
              </div>
              <p className="text-slate-700 italic mb-6">"I went to Kashmir Great Lakes as a solo traveler and felt entirely safe and welcomed. The team is extremely professional and the views were to die for."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center font-bold text-rose-700">SN</div>
                <div>
                  <h4 className="font-bold text-slate-900">Sarah N.</h4>
                  <p className="text-sm text-slate-500">Kashmir Great Lakes</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hidden lg:block">
              <div className="flex text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" /><Star className="w-5 h-5 fill-yellow-500" />
              </div>
              <p className="text-slate-700 italic mb-6">"Parvat Exploration truly stands by their name. The Hampta pass trek was breathtaking. The trek leaders taught us so many techniques for climbing through snow."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center font-bold text-rose-700">VM</div>
                <div>
                  <h4 className="font-bold text-slate-900">Vikram M.</h4>
                  <p className="text-sm text-slate-500">Hampta Pass Trek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
